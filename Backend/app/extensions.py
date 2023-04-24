from flask_sqlalchemy import SQLAlchemy
from webargs.flaskparser import FlaskParser
from logging.handlers import RotatingFileHandler
from flask_jwt_extended import JWTManager
import logging
import os
from app.model_rul import residualSimilarityModel

db = SQLAlchemy()
parser = FlaskParser()
jwt = JWTManager()

model_trained = residualSimilarityModel()

os.makedirs("logs", exist_ok=True)
app_log_handler = RotatingFileHandler('logs/app.log', maxBytes=1000000,
                                      backupCount=30)

# logger
logger = logging.getLogger('api')
logger.setLevel(logging.DEBUG)
logger.addHandler(app_log_handler)
