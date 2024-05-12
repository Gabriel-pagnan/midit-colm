from pydantic import BaseModel

class OAuth2RequestForm(BaseModel):
    '''
        ** Model auth user
    '''
    email: str
    password: str

class Token(BaseModel):
    '''
        ** Token model response
    '''
    access_token: str
    token_type: str