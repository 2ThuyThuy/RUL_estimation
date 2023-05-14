from flask import Blueprint, request
from datetime import timedelta, datetime
from app.utils import send_result, send_error
from app.models import User, MachineRaw, UserMachineRaw, MachineProcessed, ReportRUL, Consulting
from app.model_rul import model_kmeans, conditionVariables, load_Normalization, degradationSensorFusion, weights, \
    sensorToFuse, calc_accucary

from sqlalchemy import func

import pandas as pd
from app.extensions import logger, db, model_trained
import warnings
from flask_jwt_extended import (
    jwt_required, create_access_token,
    get_jwt_identity, create_refresh_token,
    get_jwt
)

warnings.filterwarnings("ignore")

api = Blueprint('dashboard_admin', __name__)


@api.route('/inc_day', methods=['PUT'])
def increase_day():
    json_data = request.get_json()
    num_inc = json_data.get('days', None)

    with open('app/files/data/date_now.txt', 'r') as file:
        get_day = file.readline()
        file.close()

    date_old = datetime.strptime(get_day, '%Y-%m-%d').date()

    date_now = date_old + timedelta(days=abs(num_inc))

    # Get data  day in a machine
    machine = MachineRaw.query.filter(
        MachineRaw.Timestamp > date_old.strftime("%Y-%m-%d"),
        MachineRaw.Timestamp <= date_now.strftime("%Y-%m-%d"),
        MachineRaw.is_user == 1
    ).all()

    if len(machine) > 0:
        df_day = pd.DataFrame.from_records(MachineRaw.many_to_json(machine))
        y_cluster = model_kmeans.predict(df_day[conditionVariables])
        df_day['cluster'] = y_cluster
        df_day = load_Normalization(df_day)
        # add each row to database
        list_machine = []
        for index, row in df_day.iterrows():
            list_machine.append(MachineProcessed(**row.to_dict()))
        db.session.add_all(list_machine)
        db.session.commit()

    with open('app/files/data/date_now.txt', 'w') as file:
        file.write(date_now.strftime("%Y-%m-%d"))
        file.close()

    # make predict RUL every machine have time step > 50
    # select day by day to predict
    check_predict = False
    for num in range(int(num_inc)):
        date_here = date_old + timedelta(days=num + 1)
        all_processed = MachineProcessed.query.filter(
            MachineProcessed.Timestamp <= date_here.strftime("%Y-%m-%d"),
            MachineProcessed.is_user == 1
        ).all()
        df_processed = pd.DataFrame.from_records(MachineRaw.many_to_json(all_processed))

        data_to_fused = []
        if len(df_processed) > 0:
            group_unit = df_processed.groupby(by='Unit').max()
            get_unit = group_unit['Timestep']
            get_timestamp = group_unit['Timestamp']

            ## check large in 50
            data_to_fused = df_processed[
                df_processed.Unit.isin(get_unit[get_unit > 50].index.values)].copy().reset_index(drop=True)
            ## check have data now
            # print(get_timestamp[get_timestamp == date_here].index.values)
            data_to_fused = data_to_fused[
                data_to_fused.Unit.isin(get_timestamp[get_timestamp == date_here].index.values)].copy().reset_index(
                drop=True)

        if len(data_to_fused) > 0:
            data_to_fused = degradationSensorFusion(data_to_fused, sensorToFuse, weights)

            results = []

            for unit in data_to_fused.Unit.unique():
                each_unit = data_to_fused[data_to_fused.Unit == unit].copy().reset_index(drop=True)
                predict_result, calc_acc, _ = model_trained.predictRUL(each_unit)
                # calc accucary predict
                ans_acc = calc_accucary(calc_acc)
                # print(calc_acc)

                category = 'Good'
                if 30 >= predict_result > 15:
                    category = 'observe'
                elif predict_result <= 15:
                    category = 'warning'
                day_err = date_here + timedelta(days=int(predict_result))

                result = ReportRUL(Timestep=max(each_unit.Timestep.values), Unit=unit,
                                   day_predict=date_here, day_error=day_err,
                                   remaining_day=int(predict_result), category=category, acc=ans_acc, is_user=1)

                # print(result.to_json())
                results.append(result)
                check_predict = True
            db.session.add_all(results)
            db.session.commit()

    data = {
        'date_now': date_now.strftime("%Y-%m-%d"),
        'check_predict': check_predict
        # 'machine': MachineRaw.many_to_json(machine)
    }
    return send_result(data=data, message="increase day successfully!")


@api.route('/dec_day', methods=['PUT'])
def decrease_day():
    json_data = request.get_json()
    num_inc = json_data.get('days', None)

    with open('app/files/data/date_now.txt', 'r') as file:
        get_day = file.readline()
        file.close()

    date_old = datetime.strptime(get_day, '%Y-%m-%d').date()
    date_now = date_old - timedelta(days=abs(num_inc))

    # delete days data
    ReportRUL.query.filter(ReportRUL.day_predict <= date_old.strftime("%Y-%m-%d"),
                           ReportRUL.day_predict > date_now.strftime("%Y-%m-%d"),
                           ReportRUL.is_user == 1).delete()
    db.session.commit()

    MachineProcessed.query.filter(MachineProcessed.Timestamp <= date_old.strftime("%Y-%m-%d"),
                                  MachineProcessed.Timestamp > date_now.strftime("%Y-%m-%d"),
                                  MachineProcessed.is_user == 1).delete()
    db.session.commit()

    with open('app/files/data/date_now.txt', 'w') as file:
        file.write(date_now.strftime("%Y-%m-%d"))
        file.close()

    data = {
        'date_now': date_now.strftime("%Y-%m-%d")
    }
    return send_result(data=data, message="decrease days successfully!")


# add jwt here
@api.route('/admin_pie', methods=['GET'])
def pie_chart():
    good, observe, warning, error = 0, 0, 0, 0
    with open('app/files/data/date_now.txt', 'r') as file:
        get_day = file.readline()
        file.close()
    date_now = datetime.strptime(get_day, '%Y-%m-%d').date()

    nums_machine = len(db.session.query(MachineRaw.Unit,
                                        MachineRaw.is_user == 1).distinct().all())
    # reportRUL = ReportRUL.query.filter(ReportRUL.day_predict == date_now.strftime("%Y-%m-%d"),
    #                                    ReportRUL.is_user == 1).all()
    # if len(reportRUL) > 0:
    #     df_report = pd.DataFrame.from_records(ReportRUL.many_to_json(reportRUL))
    #     good = len(df_report[df_report.category == 'Good'])
    #     observe = len(df_report[df_report.category == 'observe'])
    #     warning = len(df_report[df_report.category == 'warning'])
    #     error = nums_machine - (good + observe + warning)
    check_report = len(ReportRUL.query.filter(ReportRUL.is_user == 1).all())
    if check_report > 0:
        good = len(ReportRUL.query.filter(ReportRUL.day_predict == date_now.strftime("%Y-%m-%d"),
                                          ReportRUL.category == "Good",
                                          ReportRUL.is_user == 1).all())
        observe = len(ReportRUL.query.filter(ReportRUL.day_predict == date_now.strftime("%Y-%m-%d"),
                                             ReportRUL.category == "observe",
                                             ReportRUL.is_user == 1).all())
        warning = len(ReportRUL.query.filter(ReportRUL.day_predict == date_now.strftime("%Y-%m-%d"),
                                             ReportRUL.category == "warning",
                                             ReportRUL.is_user == 1).all())

        error = nums_machine - (good + observe + warning)
    data = {
        'datasets': [good, observe, warning, error]
    }
    return send_result(data=data, message="pie chart!")


@api.route('/linechart_admin', methods=['GET'])
def lineChart_admin():
    with open('app/files/data/date_now.txt', 'r') as file:
        get_day = file.readline()
        file.close()

    date_now = datetime.strptime(get_day, '%Y-%m-%d').date()
    last_15days = date_now - timedelta(days=15)

    nums_machine = len(db.session.query(MachineRaw.Unit,
                                        MachineRaw.is_user == 1).distinct().all())
    check_report = len(ReportRUL.query.filter(ReportRUL.is_user == 1).all())

    report = ReportRUL.query.filter(ReportRUL.day_predict >= last_15days.strftime("%Y-%m-%d"),
                                    ReportRUL.day_predict <= last_15days.strftime("%Y-%m-%d"),
                                    ReportRUL.is_user == 1).all()

    labels = []
    datasets = []
    data_good, data_observe, data_warning, data_error = [], [], [], []
    ## get data 15 day ago
    for num in range(int(15)):
        date_here = last_15days + timedelta(days=num + 1)
        report = ReportRUL.query.filter(ReportRUL.day_predict == date_here.strftime("%Y-%m-%d"),
                                        ReportRUL.is_user == 1).all()

        labels.append(date_here.strftime("%Y-%m-%d"))

        good, observe, warning, error = 0, 0, 0, 0
        df_report = pd.DataFrame.from_records(ReportRUL.many_to_json(report))
        if len(report) > 0:
            good = len(df_report[df_report.category == "Good"])
            observe = len(df_report[df_report.category == "observe"])
            warning = len(df_report[df_report.category == "warning"])
            error = nums_machine - (good + observe + warning)
        data_good.append(good)
        data_observe.append(observe)
        data_warning.append(warning)
        data_error.append(error)

    data = {
        "labels": labels,
        "data_good": data_good,
        "data_observe": data_observe,
        "data_warning": data_warning,
        "data_error": data_error

        # "datasets":[
        #     {
        #         "label": "Good",
        #         "data": data_good,
        #         "borderColor": "'rgb(54, 162, 235)'",
        #         "backgroundColor": "rgb(54, 162, 235)"
        #     },
        #     {
        #         "label": "Good",
        #         "data": data_observe,
        #         "borderColor": "rgb(255, 205, 86)",
        #         "backgroundColor": "rgb(255, 205, 86)"
        #     },
        #     {
        #         "label": "Good",
        #         "data": data_warning,
        #         "borderColor": "rgb(236, 147, 44)",
        #         "backgroundColor": "rgb(236, 147, 44)"
        #     },
        #     {
        #         "label": "Good",
        #         "data": data_error,
        #         "borderColor": "rgb(187, 10, 33)",
        #         "backgroundColor": "rgb(187, 10, 33)"
        #     }
        # ]
    }
    return send_result(data=data, message="LineChart chart!")


@api.route('/calendar_admin', methods=['GET'])
def calendar():
    with open('app/files/data/date_now.txt', 'r') as file:
        get_day = file.readline()
        file.close()
    date_now = datetime.strptime(get_day, '%Y-%m-%d').date()
    report = ReportRUL.query.filter(ReportRUL.day_predict == date_now.strftime("%Y-%m-%d"),
                                    ReportRUL.is_user == 1).all()
    data_events = []

    if len(report) > 0:
        for each_report in report:
            color = 'blue'
            delta = each_report.day_error - date_now
            if delta.days <= 15:
                color = 'red'
            elif delta.days <= 30:
                color = "orange"

            event = {
                "title": f"Unit {each_report.Unit} Error",
                "start": each_report.day_error.strftime("%Y-%m-%d"),
                "end": each_report.day_error.strftime("%Y-%m-%d"),
                "color": color
            }
            data_events.append(event)

    data = {
        "date_now": get_day,
        "data_events": data_events
    }

    return send_result(data=data, message="main admin!")


@api.route('/admin_dataraw', methods=['GET'])
def admin_dataraw():
    machine_raw = MachineRaw.query.with_entities(MachineRaw.Unit, func.Max(MachineRaw.Timestep),
                                                 func.min(MachineRaw.Timestamp),
                                                 func.Max(MachineRaw.Timestamp),
                                                 ).group_by(MachineRaw.Unit).all()
    data = []
    for obj in machine_raw:
        item = {
            "Unit": obj[0],
            "Max_Timestep": obj[1],
            "Min_Timestamp": obj[2].strftime("%Y-%m-%d"),
            "Max_Timestamp": obj[3].strftime("%Y-%m-%d"),
        }
        data.append(item)

    return send_result(data=data, message="main admin!")


@api.route('/admin_dataprocessed', methods=['GET'])
def admin_dataprocessed():
    machine_processed = MachineProcessed.query.with_entities(MachineProcessed.Unit, func.Max(MachineProcessed.Timestep),
                                                             func.min(MachineProcessed.Timestamp),
                                                             func.Max(MachineProcessed.Timestamp),
                                                             ).group_by(MachineProcessed.Unit).all()
    data = []
    for obj in machine_processed:
        item = {
            "Unit": obj[0],
            "Max_Timestep": obj[1],
            "Min_Timestamp": obj[2].strftime("%Y-%m-%d"),
            "Max_Timestamp": obj[3].strftime("%Y-%m-%d"),
        }
        data.append(item)
    return send_result(data=data, message="main admin!")


@api.route('/admin_consulting', methods=['GET'])
def admin_consulting():
    consults = Consulting.query.all()
    data = Consulting.many_to_json(consults)

    return send_result(data=data, message="main admin!")


@api.route('/delete_consulting', methods=['DELETE'])
def delete_consulting():
    try:
        json_data = request.get_json()
        id = json_data.get('ID', None)
    except Exception as ex:
        return send_error(message='something error')

    print(id)
    consult = Consulting.query.filter_by(id=id).first()
    db.session.delete(consult)
    db.session.commit()

    consults = Consulting.query.all()
    data = Consulting.many_to_json(consults)

    return send_result(data=data, message="main admin!")


@api.route('/update_consulting', methods=['PUT'])
def update_consulting():
    try:
        json_data = request.get_json()
        id = json_data.get('ID', None)
        category = json_data.get('category')
    except Exception as ex:
        return send_error(message='something error')

    consult = Consulting.query.filter_by(id=id).first()
    consult.categoryConsulting = category
    db.session.commit()

    consults = Consulting.query.all()
    data = Consulting.many_to_json(consults)

    return send_result(data=data, message="main admin!")


@api.route('admin_managerUser')
def admin_mamangeruser():
    data = {

    }
    return send_result(data=data, message="main admin!")


# add jwt here
@api.route('/main_admin', methods=['GET'])
@jwt_required()
def main_admin():
    current_user = get_jwt_identity()
    user = User.query.filter_by(user_id=current_user).first()
    if not user.role:
        return send_result(message="Only admin to use!")

    nums_clients = len(User.query.filter(User.role == 0).all())
    nums_machine = len(db.session.query(MachineRaw.Unit,
                                        MachineRaw.is_user == 1).distinct().all())

    with open('app/files/data/date_now.txt', 'r') as file:
        get_day = file.readline()
        file.close()

    data = {
        'nums_clients': nums_clients,
        'nums_machine': nums_machine,
        'day_now': get_day
    }
    return send_result(data=data, message="main admin!")
