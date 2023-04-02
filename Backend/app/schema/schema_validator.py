user_validator = {
    "type": "object",
    "properties": {
        "password": {
            "type": "string",
            "minLength": 1,
            "maxLength": 50
        },
        "first_name": {
            "type": "string",
            "minLength": 1,
            "maxLength": 50
        },
        "last_name": {
            "type": "string",
            "minLength": 1,
            "maxLength": 50
        },
        "email": {
            "type": "string",
            "minLength": 1,
            "maxLength": 200
        },
        "phone_number": {
            "type": "string",
            "minLength": 1,
            "maxLength": 20
        }
    },
    "required": []
}

password_validator = {
    "type": "object",
    "properties": {
        "current_password": {
            "type": "string",
            "minLength": 1,
            "maxLength": 50
        },
        "new_password": {
            "type": "string",
            "minLength": 1,
            "maxLength": 50
        }
    },
    "required": ["new_password"]
}