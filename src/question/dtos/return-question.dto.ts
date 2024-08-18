import { Question } from "../entities/question.entity";

export class ReturnQuestionDTO {
    constructor(entity: Question) {
        this.id = entity.id;
        this.title = entity.title;
        this.description = entity.description;
        this.response = entity.response;
    }

    id: number;
    title: string;
    description: string;
    response: string
}