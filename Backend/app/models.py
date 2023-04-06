from app.extensions import db
from sqlalchemy.dialects.mysql import INTEGER, TEXT
from flask_jwt_extended import decode_token, get_jwt_identity, get_jwt
from app.utils import send_error,  get_timestamp_now
class User(db.Model):
    __tablename__ = 'user'

    user_id = db.Column(db.String(50), primary_key=True)
    username = db.Column(db.String(100), nullable=True)
    password_hash = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    email = db.Column(db.String(200))
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

    @classmethod
    def get_by_user_id(cls, _user_id):
        return cls.query.get(_user_id)


# class Token(db.Model):
#     __tablename__ = 'tokens'
#     id = db.Column(db.Integer, primary_key=True)
#     jti = db.Column(db.String(36), nullable=False)
#     token_type = db.Column(db.String(10), nullable=False)
#     user_identity = db.Column(db.String(50), nullable=False)
#     revoked = db.Column(db.Boolean, nullable=False)
#     expires = db.Column(INTEGER(unsigned=True), nullable=False)
#
#     @staticmethod
#     def add_token_to_database(encoded_token, user_identity):
#         """
#             Adds a new token to the database. It is not revoked when it is added.
#             :param encoded_token:
#             :param user_identity:
#         """
#         decoded_token = decode_token(encoded_token)
#         jti = decoded_token['jti']
#         token_type = decoded_token['type']
#         expires = decoded_token['exp']
#         revoked = False
#         db_token = Token(
#             jti=jti,
#             token_type=token_type,
#             user_identity=user_identity,
#             expires=expires,
#             revoked=revoked,
#         )
#         db.session.add(db_token)
#         db.session.commit()
#
#     @staticmethod
#     def is_token_revoked(decoded_token):
#         """
#             Checks if the given token is revoked or not. Because we are adding all the
#             tokens that we create into this database, if the token is not present
#             in the database we are going to consider it revoked, as we don't know where
#             it was created.
#         """
#         jti = decoded_token['jti']
#         token = Token.query.filter_by(jti=jti).first()
#         if token:
#             return token.revoked
#         return True
#
#     @staticmethod
#     def revoke_token(jti):
#         """
#             Revokes the given token. Raises a TokenNotFound error if the token does
#             not exist in the database
#         """
#         try:
#             token = Token.query.filter_by(jti=jti).first()
#             token.revoked = True
#             db.session.commit()
#         except Exception as ex:
#             return send_error(message=str(ex))
#
#     @staticmethod
#     def revoke_all_token(users_identity):
#         """
#             Revokes the given token. Raises a TokenNotFound error if the token does
#             not exist in the database.
#             Set token Revoked flag is False to revoke this token.
#             Args:
#             users_identity: list or string, require
#                 list users id or user_id. Used to query all token of the user on the database
#         """
#         try:
#             if type(users_identity) is not list:
#                 # convert user_id to list user_ids
#                 users_identity = [users_identity]
#             tokens = Token.query.filter(Token.user_identity.in_(users_identity), Token.revoked == False).all()
#             for token in tokens:
#                 token.revoked = True
#             db.session.commit()
#         except Exception as ex:
#             return send_error(message=str(ex))
#
#     @staticmethod
#     def revoke_all_token2(users_identity):
#         """
#         Revokes all token of the given user except current token. Raises a TokenNotFound error if the token does
#         not exist in the database.
#         Set token Revoked flag is False to revoke this token.
#         Args:
#             users_identity: user id
#         """
#         jti = get_jwt()['jti']
#         try:
#             tokens = Token.query.filter(Token.user_identity == users_identity, Token.revoked == False,
#                                         Token.jti != jti).all()
#             for token in tokens:
#                 token.revoked = True
#             db.session.commit()
#         except Exception as ex:
#             return send_error(message=str(ex))
#
#     @staticmethod
#     def prune_database():
#         """
#         Delete tokens that have expired from the database.
#         How (and if) you call this is entirely up you. You could expose it to an
#         endpoint that only administrators could call, you could run it as a cron,
#         set it up with flask cli, etc.
#         """
#         now_in_seconds = get_timestamp_now()
#         Token.query.filter(Token.expires < now_in_seconds).delete()
#         db.session.commit()


