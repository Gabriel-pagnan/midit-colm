from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

user = os.getenv('DATABASE_NAME')
port = os.getenv('DATABASE_PORT')
password = os.getenv('DATABASE_PASSWORD')
db_name = os.getenv('DATABASE_DB_NAME')
host = os.getenv('DATABASE_HOST')

SQLALCHEMY_DATABASE_URL = f"postgresql://{user}:{password}@{host}:{port}/{db_name}"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()