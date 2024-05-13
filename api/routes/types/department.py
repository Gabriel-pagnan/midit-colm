from typing import List
from pydantic import BaseModel
from api.routes.types.question import QuestionType

class DepartmentResponse(BaseModel):
    '''
        **Return department response and questions vinculated**
    '''
    id: int
    name: str
    description: str | None
    questions: List[QuestionType]

class DepartmentType(BaseModel):
    '''
        **Department create DTO**
    '''
    name: str
    description: str | None = None