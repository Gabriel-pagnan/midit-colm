import os
import jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta, timezone

def verify_password(password: str, hashed_password: bytes):
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    return pwd_context.verify(password, hashed_password)    

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    algorithm = os.getenv('ALGORITHM')
    secretKey = os.getenv('SECRET_KEY')
    
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(days=2)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, str(secretKey), algorithm=algorithm)
    return encoded_jwt