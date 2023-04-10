from flask import Flask, request
from flask_cors import CORS
from app.settings import AppConfig
from app.extensions import db, jwt
import app.api as api_push


def create_app(config_object=AppConfig):

    app = Flask(__name__, static_url_path="", static_folder="./files")
    app.config.from_object(config_object)

    # register_extensions
    db.app = app
    db.init_app(app)
    jwt.init_app(app)

    register_blueprints(app)
    CORS(app)
    return app


def register_blueprints(app):
    """
    Init blueprint for api url
    :param app:
    :return:
    """
    app.register_blueprint(api_push.auth.api, url_prefix='/api/auth')
    app.register_blueprint(api_push.user.api, url_prefix='/api/users')
    app.register_blueprint(api_push.dashboard_client.api, url_prefix='/api/dashboard_client')