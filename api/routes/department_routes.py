from typing import List
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends
from api.models.dependences import get_db
from api.models.departments_model import Departments
from api.routes.types.department import DepartmentResponse
from api.helper.exception import HttpException, InternalError

router = APIRouter(tags=['department'])

model = Departments

@router.get('', response_model=List[DepartmentResponse], status_code=200)
async def list_departments(model: Session = Depends(get_db)) -> DepartmentResponse:
    try:
        departments = model.query(Departments).all()
        if len(departments) == 0 or departments == None:
            raise HttpException(500, 'Departments not found.')
        return departments
    except InternalError as error:
        HttpException(500, error)

@router.get('/{id}', response_model=DepartmentResponse, status_code=200)
async def find_department(id: int, model: Session = Depends(get_db)) -> DepartmentResponse:
    try:
        department = model.query(Departments).filter_by(id= id).first()
        print(department)
        if department:
            return department
        raise HttpException(404, 'Department not found.')
    except InternalError as error:
        HttpException(500, error)