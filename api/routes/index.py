from fastapi import APIRouter
from api.routes.auth_routes import auth
from api.routes.department_routes import router as department

routes = APIRouter()

routes.include_router(auth, prefix='/auth')
routes.include_router(department, prefix='/departments')