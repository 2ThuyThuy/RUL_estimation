
from extensions import db


class User(db.Model):
    __tablename__ = 'user'
    user_id = db.Column(db.String(50), primary_key=True)
    username = db.Column(db.String(100), nullable = True)
    password_hash = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    email = db.Column(db.String(200))
    phone_number = db.Column(db.String(20))
    role = db.Column(db.Boolean, default=1)

    def to_json(self):
        return {
            "user_id": self.user_id,
            "username": self.username,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "phone_number": self.phone_number
        }

    @classmethod
    def get_by_user_id(cls,_user_id):
        return  cls.query.get(_user_id)