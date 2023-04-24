import os
from dotenv import load_dotenv

load_dotenv()  # take environment variables from .env.


class Config(object):
    APP_DIR = os.path.abspath(os.path.dirname(__file__))  # This directory
    PROJECT_ROOT = os.path.abspath(os.path.join(APP_DIR, os.pardir))


class AppConfig(Config):

    #ENV = os.environ.get('env')
    DEBUG = False
    DEBUG_TB_ENABLED = False  # Disable Debug toolbar
    HOST = '0.0.0.0'
    TEMPLATES_AUTO_RELOAD = False

    # JWT Config
    JWT_SECRET_KEY = "jwt_secret"
    JWT_BLACKLIST_ENABLED = True
    JWT_BLACKLIST_TOKEN_CHECKS = ['access', 'refresh']

    # mysql
    #SQLALCHEMY_DATABASE_URI = os.environ.get('SQLALCHEMY_DATABASE_URI')
    SQLALCHEMY_DATABASE_URI = 'mysql://root:abcd1234@localhost/rul'
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    ## check add gitignore
    ## add a file hehe
