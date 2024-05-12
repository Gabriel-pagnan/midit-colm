from typing import Optional
from pydantic import BaseModel
from api.types.user_role import UserRole

class UserType(BaseModel):
    '''
        **User type model**
    '''
    id: Optional[int] | None = None
    name: str
    email: str
    password: str
    role: UserRole = UserRole.user