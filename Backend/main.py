from app.app import create_app
from app.settings import AppConfig

CONFIG = AppConfig

app = create_app(config_object=CONFIG)
if __name__ == "__main__":
    app.run()