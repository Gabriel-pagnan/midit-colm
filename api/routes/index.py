from fastapi import APIRouter
from api.routes.auth_routes import auth
from api.routes.department_routes import router as department
from api.routes.question_routes import router as question

routes = APIRouter()

routes.include_router(auth, prefix='/auth')
routes.include_router(question, prefix='/questions')
routes.include_router(department, prefix='/departments')