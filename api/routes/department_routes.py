from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends
from api.models.dependences import get_db
from api.models.departments_model import Departments
from api.routes.types.department import DepartmentType

router = APIRouter(tags=['department'])

model = Departments

# @router.post('', status_code=200)
# async def defaut_department(data: DepartmentType, model: Session = Depends(get_db)):
    