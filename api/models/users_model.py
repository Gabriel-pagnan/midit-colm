from datetime import datetime
from api.models.database import Base
from sqlalchemy.orm import relationship
from api.types.user_role import UserRole
from sqlalchemy import Column, DateTime, Integer, String
class Users(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    password = Column(String)
    role = Column(String, default= UserRole.user)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)