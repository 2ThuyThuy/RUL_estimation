from app.extensions import db
from sqlalchemy.dialects.mysql import INTEGER, TEXT
from flask_jwt_extended import decode_token, get_jwt_identity, get_jwt
from app.utils import send_error, get_timestamp_now


class User(db.Model):
    __tablename__ = 'user'

    user_id = db.Column(db.String(50), primary_key=True)
    username = db.Column(db.String(100), nullable=True)
    password_hash = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    email = db.Column(db.String(200), nullable=False)
    phone_number = db.Column(db.String(20))
    role = db.Column(db.Boolean, default=0)

    def to_json(self):
        return {
            "user_id": self.user_id,
            "username": self.username,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "phone_number": self.phone_number
        }

    @staticmethod
    def many_to_json(objects):
        items = []
        for o in objects:
            item = {
                'user_id': o.user_id,
                'user_name': o.user_name,
                'first_name': o.first_name,
                'last_name': o.last_name,
                'email': o.email,
                'phone_number': o.phone_number
            }
            items.append(item)
        return item

    @classmethod
    def get_by_user_id(cls, _user_id):
        return cls.query.get(_user_id)

    @classmethod
    def get_current_user(cls):
        return cls.quey.get(get_jwt_identity())

    @classmethod
    def find_all(cls):
        return cls.query.all()


class UserMachineRaw(db.Model):
    __tablename__ = 'UserMachineRaw'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(50), db.ForeignKey("user.user_id"))
    Unit = db.Column(db.Integer, db.ForeignKey("MachineRaw.Unit"))


class MachineRaw(db.Model):
    __tablename__ = 'MachineRaw'
    Unit = db.Column(db.Integer, primary_key=True)
    Timestep = db.Column(db.Integer, primary_key=True)
    Timestamp = db.Column(db.Date, nullable=False)
    op_setting_1 = db.Column(db.Float, nullable=False)
    op_setting_2 = db.Column(db.Float, nullable=False)
    op_setting_3 = db.Column(db.Float, nullable=False)
    sensor_1 = db.Column(db.Float, nullable=False)
    sensor_2 = db.Column(db.Float, nullable=False)
    sensor_3 = db.Column(db.Float, nullable=False)
    sensor_4 = db.Column(db.Float, nullable=False)
    sensor_5 = db.Column(db.Float, nullable=False)
    sensor_6 = db.Column(db.Float, nullable=False)
    sensor_7 = db.Column(db.Float, nullable=False)
    sensor_8 = db.Column(db.Float, nullable=False)
    sensor_9 = db.Column(db.Float, nullable=False)
    sensor_10 = db.Column(db.Float, nullable=False)
    sensor_11 = db.Column(db.Float, nullable=False)
    sensor_12 = db.Column(db.Float, nullable=False)
    sensor_13 = db.Column(db.Float, nullable=False)
    sensor_14 = db.Column(db.Float, nullable=False)
    sensor_15 = db.Column(db.Float, nullable=False)
    sensor_16 = db.Column(db.Float, nullable=False)
    sensor_17 = db.Column(db.Float, nullable=False)
    sensor_18 = db.Column(db.Float, nullable=False)
    sensor_19 = db.Column(db.Float, nullable=False)
    sensor_20 = db.Column(db.Float, nullable=False)
    sensor_21 = db.Column(db.Float, nullable=False)
    is_user = db.Column(db.Integer, nullable=False)


    @staticmethod
    def get_Unit_in_obj(objects):
        Unit = None
        for obj in objects:
            Unit = obj.Unit
            break
        return Unit


    @staticmethod
    def many_to_json(objects):
        items = []
        for obj in objects:
            item = {
                'Unit': obj.Unit,
                'Timestep': obj.Timestep,
                'Timestamp': obj.Timestamp,
                'op_setting_1': obj.op_setting_1,
                'op_setting_2': obj.op_setting_2,
                'op_setting_3': obj.op_setting_3,
                'sensor_1': obj.sensor_1,
                'sensor_2': obj.sensor_2,
                'sensor_3': obj.sensor_3,
                'sensor_4': obj.sensor_4,
                'sensor_5': obj.sensor_5,
                'sensor_6': obj.sensor_6,
                'sensor_7': obj.sensor_7,
                'sensor_8': obj.sensor_8,
                'sensor_9': obj.sensor_9,
                'sensor_10': obj.sensor_10,
                'sensor_11': obj.sensor_11,
                'sensor_12': obj.sensor_12,
                'sensor_13': obj.sensor_13,
                'sensor_14': obj.sensor_14,
                'sensor_15': obj.sensor_15,
                'sensor_16': obj.sensor_16,
                'sensor_17': obj.sensor_17,
                'sensor_18': obj.sensor_18,
                'sensor_19': obj.sensor_19,
                'sensor_20': obj.sensor_20,
                'sensor_21': obj.sensor_21,
                'is_user': obj.is_user
            }
            items.append(item)
        return items

    @classmethod
    def get_by_machine_id(cls, _machine_id):
        return cls.query.get(_machine_id)


class UserMachine(db.Model):
    __tablename__ = 'UserMachine'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(50), db.ForeignKey("user.user_id"))
    Unit = db.Column(db.Integer, db.ForeignKey("MachineProcessed.Unit"))


class MachineProcessed(db.Model):
    __tablename__ = 'MachineProcessed'

    Unit = db.Column(db.Integer, primary_key=True)
    Timestep = db.Column(db.Integer, primary_key=True)
    Timestamp = db.Column(db.Date, nullable=False)
    op_setting_1 = db.Column(db.Float, nullable=False)
    op_setting_2 = db.Column(db.Float, nullable=False)
    op_setting_3 = db.Column(db.Float, nullable=False)
    sensor_1 = db.Column(db.Float, nullable=False)
    sensor_2 = db.Column(db.Float, nullable=False)
    sensor_3 = db.Column(db.Float, nullable=False)
    sensor_4 = db.Column(db.Float, nullable=False)
    sensor_5 = db.Column(db.Float, nullable=False)
    sensor_6 = db.Column(db.Float, nullable=False)
    sensor_7 = db.Column(db.Float, nullable=False)
    sensor_8 = db.Column(db.Float, nullable=False)
    sensor_9 = db.Column(db.Float, nullable=False)
    sensor_10 = db.Column(db.Float, nullable=False)
    sensor_11 = db.Column(db.Float, nullable=False)
    sensor_12 = db.Column(db.Float, nullable=False)
    sensor_13 = db.Column(db.Float, nullable=False)
    sensor_14 = db.Column(db.Float, nullable=False)
    sensor_15 = db.Column(db.Float, nullable=False)
    sensor_16 = db.Column(db.Float, nullable=False)
    sensor_17 = db.Column(db.Float, nullable=False)
    sensor_18 = db.Column(db.Float, nullable=False)
    sensor_19 = db.Column(db.Float, nullable=False)
    sensor_20 = db.Column(db.Float, nullable=False)
    sensor_21 = db.Column(db.Float, nullable=False)
    cluster = db.Column(db.Integer, nullable=False)
    is_user = db.Column(db.Integer, nullable=False)
    @staticmethod
    def many_to_json(objects):
        items = []
        for obj in objects:
            item = {
                'Unit': obj.Unit,
                'Timestep': obj.Timestep,
                'Timestamp': obj.Timestamp,
                'op_setting_1': obj.op_setting_1,
                'op_setting_2': obj.op_setting_2,
                'op_setting_3': obj.op_setting_3,
                'sensor_1': obj.sensor_1,
                'sensor_2': obj.sensor_2,
                'sensor_3': obj.sensor_3,
                'sensor_4': obj.sensor_4,
                'sensor_5': obj.sensor_5,
                'sensor_6': obj.sensor_6,
                'sensor_7': obj.sensor_7,
                'sensor_8': obj.sensor_8,
                'sensor_9': obj.sensor_9,
                'sensor_10': obj.sensor_10,
                'sensor_11': obj.sensor_11,
                'sensor_12': obj.sensor_12,
                'sensor_13': obj.sensor_13,
                'sensor_14': obj.sensor_14,
                'sensor_15': obj.sensor_15,
                'sensor_16': obj.sensor_16,
                'sensor_17': obj.sensor_17,
                'sensor_18': obj.sensor_18,
                'sensor_19': obj.sensor_19,
                'sensor_20': obj.sensor_20,
                'sensor_21': obj.sensor_21,
                'cluster': obj.cluster,
                'is_user': obj.is_user
            }
            items.append(item)
        return items

    @classmethod
    def get_by_machine_id(cls, _machine_id):
        return cls.query.get(_machine_id)


class ReportRUL(db.Model):
    __tablename__ = 'ReportRUL'
    id = db.Column(db.Integer, primary_key=True)
    Unit = db.Column(db.Integer, db.ForeignKey("MachineProcessed.Unit"))
    Timestep = db.Column(db.Integer, nullable=False)
    day_predict = db.Column(db.Date, nullable=False)
    day_error = db.Column(db.Date, nullable=False)
    remaining_day = db.Column(db.Integer, nullable=False)
    category = db.Column(db.String(255), nullable=False)
    acc = db.Column(db.Float, nullable=False)
    is_user = db.Column(db.Integer, nullable=False)

    def to_json(self):
        return {
            "Unit": self.Unit,
            "Timestep": self.Timestep,
            "day_predict": self.day_predict,
            "day_error": self.day_error,
            "remaining_day": self.remaining_day,
            "category": self.category,
            "acc": self.acc
        }