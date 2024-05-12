from sqlalchemy.orm import Session
from api.models.users_model import Users

async def find_user_by_email(email: str, database: Session):
    response = database.query(Users).filter_by(email= email).first()
    if response:
        return response