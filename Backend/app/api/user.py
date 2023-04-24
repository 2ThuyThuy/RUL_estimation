import os
import random
import uuid
from jsonschema import validate
from app.utils import send_result, send_error, hash_password, get_datetime_now, is_password_contain_space
from flask import Blueprint, request
from app.schema.schema_validator import user_validator, password_validator
from app.models import User
from app.extensions import logger, db
api = Blueprint('users', __name__)


@api.route('/register', methods=['POST'])
def create_user():
    """ This is api for the user management registers user.
           Request Body:
           Returns:
           Examples::
    """
    try:
        json_data = request.get_json()
        # Check valid params
        validate(instance=json_data, schema=user_validator)

        username = json_data.get('username', None).strip()
        password = json_data.get('password', None)
        first_name = json_data.get('first_name', None)
        last_name = json_data.get('last_name', None)
        email = json_data.get('email', None)
        # phone_number = json_data.get('phone_number', None)
    except Exception as ex:
        logger.error('Parameters error: ' + str(ex))
        return send_error(message="Parameters error: " + str(ex))

    user_duplicated = User.query.filter_by(username=username).first()
    if user_duplicated:
        return send_error(message="The username has existed!")

    email_duplicated = User.query.filter_by(email=email).first()
    if email_duplicated:
        return send_error(message="The email has existed!")

    if is_password_contain_space(password):
        return send_error(message='Password cannot contain spaces')

    _user_id = str(uuid.uuid1())

    new_values = User(user_id=_user_id, username=username,
                      password_hash=hash_password(password),
                      first_name=first_name, last_name=last_name,
                      email=email, role=0)
    db.session.add(new_values)
    db.session.commit()

    data = {
        'id': _user_id,
        'username': username
    }

    return send_result(data=data, message="Create user successfully!")


@api.route('/<user_id>', methods=['PUT'])
def update_user(user_id):
    """ This is api for the user management edit the user.
            Request Body:
            Returns:
            Examples::
    """
    user = User.get_by_user_id(user_id)
    if user is None:
        return send_error(message="Not found user!")

    try:
        json_data = request.get_json()
        # Check valid params
        validate(instance=json_data, schema=user_validator)
    except Exception as ex:
        return send_error(message=str(ex))

    keys = ["first_name", "last_name", "email", "phone_number"]
    data = {}

    for key in keys:
        if key in json_data:
            data[key] = json_data.get(key)
            setattr(user, key, json_data.get(key))

    db.session.commit()
    return send_result(data=data, message="Update user successfully!")


