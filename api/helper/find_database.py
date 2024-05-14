from typing import Type, TypeVar
from sqlalchemy.orm import Session
from api.models.users_model import Users
from fastapi import HTTPException, status

ModelType = TypeVar('ModelType')

async def find_user_by_email(email: str, database: Session):
    response = database.query(Users).filter_by(email= email).first()
    if response:
        return response
    

async def find_by_id(
    id: int, 
    model: Type[ModelType], 
    datadase: Session,
    exception: str
):
    '''
        ** model: model to be searched in the database
        exception: exception if not found in the database **
    '''
    response = datadase.query(model).filter_by(id= id).first()

    if response:
        return response
    raise HTTPException(status_code= status.HTTP_404_NOT_FOUND, detail=str(exception))