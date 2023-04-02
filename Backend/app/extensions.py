from flask_sqlalchemy import SQLAlchemy
from webargs.flaskparser import FlaskParser
from logging.handlers import RotatingFileHandler
import logging
import os


db = SQLAlchemy()
parser = FlaskParser()

os.makedirs("logs", exist_ok=True)
app_log_handler = RotatingFileHandler('logs/app.log', maxBytes=1000000,
                                      backupCount=30)

# logger
logger = logging.getLogger('api')
logger.setLevel(logging.DEBUG)
logger.addHandler(app_log_handler)
