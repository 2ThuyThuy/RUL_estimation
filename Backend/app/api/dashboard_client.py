from datetime import timedelta
from flask import Blueprint
from datetime import timedelta, datetime
from app.models import User, MachineRaw, UserMachineRaw, ReportRUL, MachineProcessed
from app.utils import parse_req, FieldString, send_result, send_error, get_datetime_now
from app.extensions import logger, db, jwt
from sqlalchemy import func
from flask_jwt_extended import (
    jwt_required, create_access_token,
    get_jwt_identity, create_refresh_token,
    get_jwt
)

api = Blueprint('dashboard_client', __name__)


@api.route('/calendar_client', methods=['GET'])
@jwt_required()
def calendar_client():
    current_user = get_jwt_identity()

    user = User.query.filter_by(user_id=current_user).first()
    machine = MachineRaw.query.join(UserMachineRaw).filter(UserMachineRaw.user_id == current_user).all()
    unit = MachineRaw.get_Unit_in_obj(machine)

    with open('app/files/data/date_now.txt', 'r') as file:
        get_day = file.readline()
        file.close()

    date_now = datetime.strptime(get_day, '%Y-%m-%d').date()

    report = ReportRUL.query.filter(ReportRUL.day_predict == get_day,
                                    ReportRUL.Unit == unit,
                                    ReportRUL.is_user == 1).first()
    data_events = []
    if report:
        color = 'blue'
        delta = report.day_error - date_now
        if delta.days <= 15:
            color = 'red'
        elif delta.days <= 30:
            color = "orange"

        event = {
            "title": f"Unit {report.Unit} Error",
            "start": report.day_error.strftime("%Y-%m-%d"),
            "end": report.day_error.strftime("%Y-%m-%d"),
            "color": color
        }
        data_events.append(event)

    data = {
        "date_now": get_day,
        "data_events": data_events
    }
    return send_result(data=data, message="Create user successfully!")


@api.route('/dataprocessed_client', methods=['GET'])
@jwt_required()
def dataprocessed_client():
    current_user = get_jwt_identity()

    user = User.query.filter_by(user_id=current_user).first()
    machine = MachineRaw.query.join(UserMachineRaw).filter(UserMachineRaw.user_id == current_user).all()
    unit = MachineRaw.get_Unit_in_obj(machine)

    machineProcessed = MachineProcessed.query.filter(MachineProcessed.Unit == unit).all()

    data = MachineProcessed.many_to_json(machineProcessed)
    return send_result(data=data, message="Create user successfully!")


@api.route('/report_client', methods=['GET'])
@jwt_required()
def report_client():
    current_user = get_jwt_identity()
    user = User.query.filter_by(user_id=current_user).first()
    machine = MachineRaw.query.join(UserMachineRaw).filter(UserMachineRaw.user_id == current_user).all()
    unit = MachineRaw.get_Unit_in_obj(machine)

    with open('app/files/data/date_now.txt', 'r') as file:
        get_day = file.readline()
        file.close()

    date_now = datetime.strptime(get_day, '%Y-%m-%d').date()

    report_rul = ReportRUL.query.filter(ReportRUL.Unit == unit, ReportRUL.day_predict == get_day).first()

    day_error, remaining_day, acc, day_start, operation = "_", "_", "_", "_", 0

    if report_rul:
        day_error = report_rul.day_error.strftime("%Y-%m-%d")
        remaining_day = report_rul.remaining_day
        acc = report_rul.acc

    machine_processed = MachineProcessed.query.filter(MachineProcessed.Unit == unit) \
        .with_entities(MachineProcessed.Unit,
                       func.min(MachineProcessed.Timestamp),
                       ).group_by(MachineProcessed.Unit).first()

    if machine_processed:
        day_start = machine_processed[1]
        delta = date_now - day_start
        operation = delta.days

    data = {
        "name": user.username,
        "email": user.email,
        "phone": user.phone_number,
        "now_date": get_day,
        "items": [
            {
                "unit": unit,
                "day_start": day_start.strftime("%Y-%m-%d"),
                "operation": operation,
                "day_error": day_error,
                "reliability": str(acc) + "%",
                "remaining": remaining_day
            }
        ]
    }
    return send_result(data=data, message="Create user successfully!")


@api.route('/main_client', methods=['GET'])
@jwt_required()
def main_dashboard_client():
    current_user = get_jwt_identity()

    user = User.query.filter_by(user_id=current_user).first()
    machine = MachineRaw.query.join(UserMachineRaw).filter(UserMachineRaw.user_id == current_user).all()
    unit = MachineRaw.get_Unit_in_obj(machine)

    with open('app/files/data/date_now.txt', 'r') as file:
        get_day = file.readline()
        file.close()

    date_now = datetime.strptime(get_day, '%Y-%m-%d').date()
    last_15days = date_now - timedelta(days=15)

    report_rul = ReportRUL.query.filter(ReportRUL.Unit == unit,
                                        ReportRUL.day_predict == get_day).first()

    day_error, remaining_day, acc = "_", "_", "_"

    if report_rul:
        day_error = report_rul.day_error.strftime("%Y-%m-%d")
        remaining_day = report_rul.remaining_day
        acc = report_rul.acc

    ## get data 15 day ago
    label_linechart = []
    data_linechart = []
    for num in range(int(15)):
        date_here = last_15days + timedelta(days=num + 1)
        report = ReportRUL.query.filter(ReportRUL.day_predict == date_here.strftime("%Y-%m-%d"),
                                        ReportRUL.Unit == unit,
                                        ReportRUL.is_user == 1).first()

        rem_day = 0
        if report:
            rem_day = report.remaining_day
        data_linechart.append(rem_day)
        label_linechart.append(date_here.strftime("%Y-%m-%d"))

    data = {
        # 'id': user.user_id,
        'username': user.username,
        'unit': unit,
        'day_now': get_day,
        'day_error': day_error,
        'remaining_day': remaining_day,
        'acc': acc,
        'label_linechart': label_linechart,
        'data_linechart': data_linechart

        # 'machine': MachineRaw.many_to_json(machine)
    }

    return send_result(data=data, message="Create user successfully!")
