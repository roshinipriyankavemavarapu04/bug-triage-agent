from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

USERNAME = "root"
PASSWORD = "root"
HOST = "localhost"
PORT = 3306
DATABASE = "bug_triage_db"


DATABASE_URL = "mysql+pymysql://root:root@localhost:3306/bug_triage"


engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()