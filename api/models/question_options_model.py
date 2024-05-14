from datetime import datetime
from api.models.database import Base
from sqlalchemy.orm import relationship
from sqlalchemy import Column, String, Integer, Boolean, DateTime, ForeignKey

class QuestionOptions(Base):
    __tablename__ = 'questionOptions'

    id = Column(Integer, primary_key= True, autoincrement= True, index= True)
    question_id = Column(Integer, ForeignKey('questions.id'), index= True)
    yes_totally = Column(Boolean, nullable= False)
    yes_needs_readjustment = Column(Boolean, nullable= False)
    no = Column(Boolean, nullable= False)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    # relationship
    questions = relationship('Questions', back_populates='questionOptions')