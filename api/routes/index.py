from fastapi import APIRouter
from api.routes.auth_routes import auth

routes = APIRouter()

routes.include_router(auth, prefix='/auth')