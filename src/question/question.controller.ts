import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { QuestionService } from './question.service';
import { Optional } from 'sequelize';
import { Question } from './entities/question.entity';
import { ReturnQuestionDTO } from './dtos/return-question.dto';
import { UpdateQuestioDTO } from './dtos/update-question.dto';
import { QuestionOption } from './entities/question-option.entity';

@Controller('questions')
export class QuestionController {
    constructor(
        private readonly questionService: QuestionService
    ) { }

    @Post()
    @HttpCode(201)
    async create(@Body() data: Optional<any, string>): Promise<Question> {
        return this.questionService.create(data);
    }

    @Get(':id')
    @HttpCode(200)
    async findQuestion(@Param('id') id: number): Promise<ReturnQuestionDTO> {
        const question = await this.questionService.findQuestion(id);
        if (question) {
            return new ReturnQuestionDTO(question);
        }
    }

    @Get()
    @HttpCode(200)
    async findAllQuestions(): Promise<ReturnQuestionDTO[]> {
        const questions = await this.questionService.findAllQuestion();
        if (questions && questions.length) {
            return questions.map((question) => {
                return new ReturnQuestionDTO(question)
            });
        }
    }

    @Put(':id')
    @HttpCode(200)
    async updateQuestion(
        @Param('id') id: number,
        @Body() data: UpdateQuestioDTO
    ): Promise<Question> {
        if (data) {
            return this.questionService.updateQuestion(id, data);
        }
    }

    @Delete(':id')
    @HttpCode(200)
    async deleteQuestion(@Param('id') id: number) {
        return this.questionService.deleteQuestion(id);
    }

    @Post('/options')
    @HttpCode(201)
    async insertOptions(@Body() data: Optional<any, string>): Promise<QuestionOption> {
        if (data) {
            return this.questionService.insertOptions(data);
        }
    }
} 
