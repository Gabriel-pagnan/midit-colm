from datetime import timedelta
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from api.models.users_model import Users
from api.models.dependences import get_db
from api.routes.types.user import UserType
from api.helper.find_database import find_user_by_email
from api.routes.types.auth import OAuth2RequestForm, Token
from fastapi import APIRouter, Depends, status, HTTPException
from api.helper.exception import InternalError, HttpException
from api.helper.authenticate import create_access_token, verify_password

auth = APIRouter(tags=['auth'])
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@auth.post('/register', status_code=200)
async def register_user(data: UserType, model: Session = Depends(get_db)):
    try:
        if data:
            data.password = pwd_context.hash(data.password)
            user = Users(**data.__dict__)

            if user:
                model.add(user)
                model.commit()
                model.refresh(user)

                return HttpException(200, 'User successfully registered')
    except InternalError as error:
        HttpException(500, error)

@auth.post('/login', status_code=200)
async def login(data: OAuth2RequestForm, model: Session = Depends(get_db)) -> Token:
    try:
        if data:
            user = await find_user_by_email(data.email, model)

            if user:
                verify = verify_password(data.password, user.password)

                if verify is True:
                    access_token_expires = timedelta(days=2)
                    access_token = create_access_token(
                        data={"sub": user.email},
                        expires_delta= access_token_expires
                    )

                    return Token(access_token= access_token, token_type="bearer")
            else:
                raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid password or email",
                headers={"WWW-Authenticate": "Bearer"},
            )
    except InternalError as error:
        HttpException(500, error)