from datetime import timedelta
from flask import Blueprint
from app.models import User, MachineRaw, UserMachineRaw
from app.utils import parse_req, FieldString, send_result, send_error, get_datetime_now
from app.extensions import logger,  db,  jwt
from flask_jwt_extended import (
    jwt_required, create_access_token,
    get_jwt_identity, create_refresh_token,
    get_jwt
)

api = Blueprint('dashboard_client', __name__)


@api.route('/main', methods=['GET'])
@jwt_required()
def main_dashboard_client():
    current_user = get_jwt_identity()

    user = User.query.filter_by(user_id=current_user).first()

    machine = MachineRaw.query.join(UserMachineRaw).filter(UserMachineRaw.user_id == current_user).all()
    unit = MachineRaw.get_Unit_in_obj(machine)

    with open('app/files/data/date_now.txt', 'r') as file:
        get_day = file.readline()
        file.close()


    data = {
        'id': user.user_id,
        'username': user.username,
        'unit': unit,
        'day_now': get_day
        #'machine': MachineRaw.many_to_json(machine)
    }

    return send_result(data=data, message="Create user successfully!")

