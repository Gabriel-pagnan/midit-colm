from datetime import datetime
from api.models.database import Base
from sqlalchemy.orm import relationship
from sqlalchemy import Column, DateTime, Integer, String


class Departments(Base):
    __tablename__ = 'departments'

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    name = Column(String(100), nullable= False)
    description = Column(String(255))
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    # relations departments
    questions = relationship('Questions', back_populates='departments')