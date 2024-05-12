from _api.models.database import SessionLocal

def get_db():
    '''
        **Dependences**
    '''
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()