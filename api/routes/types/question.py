from typing import Optional
from pydantic import BaseModel

class QuestionType(BaseModel):
    '''
        **Return questions response**
    '''
    id: Optional[int] | None = None
    title: str
    description: str
    response: str
    department_id: int

class QuestionUpdateType(BaseModel):
    '''
        **Create questions model**
    '''
    title: str
    description: str
    response: str
    department_id: int