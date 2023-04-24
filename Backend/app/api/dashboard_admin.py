from flask import Blueprint, request
from datetime import timedelta, datetime
from app.utils import send_result
from app.models import User, MachineRaw, UserMachineRaw, MachineProcessed, ReportRUL
from app.model_rul import model_kmeans, conditionVariables, load_Normalization, degradationSensorFusion, weights, \
    sensorToFuse, calc_accucary

from sqlalchemy import func

import pandas as pd
from app.extensions import logger, db, model_trained
import warnings

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
            get_unit = df_processed.groupby(by='Unit').max()['Timestep']
            data_to_fused = df_processed[
                df_processed.Unit.isin(get_unit[get_unit > 50].index.values)].copy().reset_index(drop=True)

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
    return send_result(data=data, message="Create user successfully!")


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
    return send_result(data=data, message="Create user successfully!")


# add jwt here
@api.route('/main_admin', methods=['GET'])
def main_admin():
    nums_clients = len(User.query.filter(User.role == 0).all())

    nums_machine = len(db.session.query(MachineRaw.Unit,
                                        MachineRaw.is_user == 1).distinct().all())
    data = {
        'nums_clients': nums_clients,
        'nums_machine': nums_machine
    }
    return send_result(data=data, message="Create user successfully!")



## get here