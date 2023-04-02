from flask import Flask, request
from flask_cors import CORS

from app.settings import AppConfig
from app.extensions import db



def create_app(config_object=AppConfig):

    app = Flask(__name__, static_url_path="", static_folder="./files")
    app.config.from_object(config_object)

    # register_extensions
    db.app = app
    db.init_app(app)

    CORS(app)
    return app
