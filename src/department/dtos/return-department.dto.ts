import { ReturnQuestionDTO } from "../../question/dtos/return-question.dto";
import { Department } from "../entities/department.entity";

export class ReturnDepartmentDTO {
    constructor(entity: Department) {  
        this.id = entity.id;
        this.name = entity.name;
        this.description = entity.description;
        this.questions = entity.questions 
        ? entity.questions.map(question => new ReturnQuestionDTO(question)) 
        : undefined
    }

    id: number;
    name: string;
    description: string;
    questions?: ReturnQuestionDTO[]
}