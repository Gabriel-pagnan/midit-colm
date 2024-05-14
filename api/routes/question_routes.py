from typing import List
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends
from api.helper.find_database import find_by_id
from api.models.departments_model import Departments
from api.models.dependences import get_db
from api.models.question_options_model import QuestionOptions
from api.models.questions_model import Questions
from api.helper.exception import HttpException, InternalError
from api.routes.types.options import OptionType
from api.routes.types.question import QuestionType, QuestionUpdateType

router = APIRouter(tags=['question'])

model = Questions

@router.get('', response_model=List[QuestionType], status_code=200)
async def list_questions(db: Session = Depends(get_db)) -> QuestionType:
    try:
        questions = db.query(model).all()

        if len(questions) == 0 or questions == None:
            raise HttpException(404, 'Questions not found.')
        return questions
    except InternalError as error:
        raise HttpException(500, str(error))


@router.get('/{id}', response_model=QuestionType, status_code=200)
async def find_question(id: int, db: Session = Depends(get_db)) -> QuestionType:
    try:
        question = db.query(model).filter_by(id= id).first()
        if question:
            return question
        else:
            raise HttpException(404, 'Question not found.')
    except InternalError as error:
        raise HttpException(500, str(error))


@router.post('', status_code=201)
async def create_question(data: QuestionType, db: Session = Depends(get_db)):
    try:
        response = Questions(**data.__dict__)

        if response:
            db.add(response)
            db.commit()
            db.refresh(response)

            return {
                'message': 'Question successfully registered'
            }
    except InternalError as error:
        raise HttpException(500, str(error))
    
@router.put('/{id}', response_model= QuestionUpdateType, status_code=200)
async def update_question(
    id: int,
    data: QuestionUpdateType,
    db: Session = Depends(get_db)
) -> QuestionUpdateType:
    try:
        department = db.query(Departments).filter(data.department_id == Departments.id).first()

        if department is None:
            raise HttpException(404, "Department not found.")
        else:
            question = await find_by_id(
                id= id,
                model= model,
                datadase= db,
                exception= "Question not found."
            )

            if question:
                for attr in vars(question):
                    if hasattr(data, attr):
                        setattr(question, attr, getattr(data, attr))

                db.commit()
                db.refresh(question)
                return question
    except InternalError as error:
        raise HttpException(500, str(error))
    

@router.delete('/{id}', status_code=200)
async def delete_question(id: int, db: Session = Depends(get_db)):
    try:
        question = await find_by_id(
            id= id,
            model= model,
            datadase= db,
            exception= "Question not found."
        )
        if question:
            db.delete(question)
            db.commit()
            return {"message": "Question deleted successfully"}
    except InternalError as error:
        raise HttpException(500, str(error))

@router.post('/options/{question_id}', status_code=201)
async def insert_options(
    question_id: int, 
    data: OptionType, 
    db: Session = Depends(get_db)
):
    try:
        question = await find_by_id(
            id= question_id, 
            model= model, 
            datadase= db,
            exception= 'Question not found.'
        )
        
        if question:
            department = db.query(Departments).filter(question.department_id == Departments.id).first()

            if department and data:
                options = QuestionOptions(
                    **data.__dict__,
                    department = department.name,
                    question_id = question_id
                )

                if options:
                    db.add(options)
                    db.commit()
                    db.refresh(options)

                    return options
    except InternalError as error:
        raise HttpException(500, str(error))