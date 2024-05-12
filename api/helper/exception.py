from fastapi import HTTPException

class InternalError(Exception):
    pass

class HttpException(HTTPException):
    def __init__(self, status_code: int, detail: str) -> None:
        super().__init__(status_code= status_code, detail= detail)