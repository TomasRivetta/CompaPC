from sqlalchemy import inspect, text

from app.db.session import engine
from app.db.models import Base


def init_db():
    Base.metadata.create_all(bind=engine)

    inspector = inspect(engine)
    columns = {column["name"] for column in inspector.get_columns("product_offers")}
    if "image" not in columns:
        with engine.begin() as connection:
            connection.execute(
                text("ALTER TABLE product_offers ADD COLUMN image VARCHAR(1000)")
            )

if __name__ == "__main__":
    init_db()
    print("DB inicializada")
