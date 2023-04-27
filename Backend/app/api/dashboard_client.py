from datetime import timedelta
from flask import Blueprint
from app.models import User, MachineRaw, UserMachineRaw, ReportRUL
from app.utils import parse_req, FieldString, send_result, send_error, get_datetime_now
from app.extensions import logger,  db,  jwt
from flask_jwt_extended import (
    jwt_required, create_access_token,
    get_jwt_identity, create_refresh_token,
    get_jwt
)

api = Blueprint('dashboard_client', __name__)


@api.route('/linechart_client', method=['Get'])
@jwt_required()
def linechart_client():
    with open('app/files/data/date_now.txt', 'r') as file:
        get_day = file.readline()
        file.close()

    current_user = get_jwt_identity()

    user = User.query.filter_by(user_id=current_user).first()
    machine = MachineRaw.query.join(UserMachineRaw).filter(UserMachineRaw.user_id == current_user).all()
    unit = MachineRaw.get_Unit_in_obj(machine)


    data = {
        "SOMETHING": "KHUM"
    }

    return send_result(data=data, message=" successfully!")

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

    check_predict = False
    report_rul = ReportRUL.query.filter(ReportRUL.Unit == unit,
                                        ReportRUL.day_predict == get_day).first()

    day_error, remaining_day, acc = "_", "_", "_"

    if report_rul:
        check_predict = True
        day_error = report_rul.day_error.strftime("%Y-%m-%d")
        remaining_day = report_rul.remaining_day
        acc = report_rul.acc


    data = {
        #'id': user.user_id,
        'username': user.username,
        'unit': unit,
        'day_now': get_day,
        'day_error': day_error,
        'remaining_day':remaining_day,
        'acc': acc

        #'machine': MachineRaw.many_to_json(machine)
    }

    return send_result(data=data, message="Create user successfully!")


