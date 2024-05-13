from datetime import datetime
from api.models.database import Base
from sqlalchemy.orm import relationship
from api.models.departments_model import Departments
from sqlalchemy import Column, DateTime, Integer, String, ForeignKey

class Questions(Base):
    __tablename__ = 'questions'

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    title = Column(String(255))
    description = Column(String(255))
    response = Column(String(255))
    department_id = Column(Integer, ForeignKey(Departments.id))
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    # relationship
    departments = relationship(Departments, back_populates='questions')