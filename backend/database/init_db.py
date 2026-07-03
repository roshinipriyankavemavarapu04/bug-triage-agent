from .database import engine, Base

# Import all models before create_all()
from .models import Bug, User


def create_tables():
    Base.metadata.create_all(bind=engine)
    print("Tables created successfully!")


if __name__ == "__main__":
    create_tables()