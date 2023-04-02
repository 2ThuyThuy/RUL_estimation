from flask import Blueprint
from app.models import User
from werkzeug.security import check_password_hash
from app.utils import parse_req, FieldString, send_result, send_error, get_datetime_now
from app.extensions import logger,  db

api = Blueprint('auth', __name__)

@api.route('/login', methods=['POST'])
def login():
    """ This is controller of the login api
        Requests Body:
        Returns:
        Examples::
    """

    params = {
        'username': FieldString(),
        'password': FieldString(),
    }
    try:
        json_data = parse_req(params)

        username = json_data.get('username', None).strip()
        password = json_data.get('password')

    except Exception as ex:
        logger.error('{} Parameters error: '.format(get_datetime_now().strftime('%Y-%b-%d %H:%M:%S')) + str(ex))
        return send_error(message='Invalid username or password.\nPlease try again')

    user = User.query.filter_by(username=username).first()
    if user is None:
        return send_error(message='Invalid username or password.\nPlease try again')

    if not check_password_hash(user.password_hash, password):
        return send_error(message='Invalid username or password.\nPlease try again')

    data = {
        'username': user.username,
        'user_id': user.user_id,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email
    }

    return send_result(data=data, message="Logged in successfully!")