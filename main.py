import os
import uvicorn
import logging
from fastapi import FastAPI
from alembic import command
from alembic.config import Config
from api.models.database import SessionLocal
from api.models.departments_model import Departments
from api.routes.index import routes
from contextlib import asynccontextmanager
from fastapi.openapi.utils import get_openapi
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
log = logging.getLogger("uvicorn")

upgrade_db = os.getenv('DATABASE_UPGRADE')
def run_migrations():
    alembic_config = Config('alembic.ini')
    command.upgrade(alembic_config, 'head')

def create_initial_data():
    model = SessionLocal()
    result = model.query(Departments).filter_by(name= 'Marketing').first()
    if not result: 
        department = Departments(
            name="Marketing", 
            description="Setor responsável pelo marketing."
        )

        model.add(department)
        model.commit()
        model.close()

@asynccontextmanager
async def lifespan(app_: FastAPI):
    if upgrade_db == 'True':
        log.info('Run alembic upgrade head...')
        run_migrations()
        create_initial_data()
    yield

origins =[
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app = FastAPI(lifespan= lifespan)
app.include_router(routes)

openapi_schema = get_openapi( 
    title="API MIDIT",
    version="1.1.1",
    summary="Administrative api of the hive MIDIT Colmeia System",
    description="This is OpenAPI schema",
    routes=app.routes,
)
app.openapi_schema = openapi_schema

if __name__ == '__main__':
    uvicorn.run('main:app', host='0.0.0.0', port=8000, reload=True)