import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Question } from './entities/question.entity';
import { Repository, Sequelize } from 'sequelize-typescript';
import { DepartmentService } from '../department/department.service';
import { Optional } from 'sequelize';
import { UpdateQuestioDTO } from './dtos/update-question.dto';
import { QuestionOption } from './entities/question-option.entity';
// import { CreateQuestionOptionDTO } from './dtos/create-question-option.dto';

@Injectable()
export class QuestionService {
    constructor(
        @InjectModel(Question)
        private readonly questionRepository: Repository<Question>,
        @InjectModel(QuestionOption)
        private readonly optionRepository: Repository<QuestionOption>,
        private readonly departmentService: DepartmentService,
        private readonly sequelize: Sequelize
    ) { }

    async create(data: Optional<any, string>): Promise<Question> {
        const transaction = await this.sequelize.transaction();

        try {
            let department = null;
            if (data.department_id) {
                department = await this.departmentService.findDepartment(data.department_id)
            }

            if (!department) {
                throw new NotFoundException('Question Not Found');
            }

            const question = await this.questionRepository.create(data, { transaction });

            await transaction.commit();
            return question
        } catch (error) {
            await transaction.rollback();
            throw new InternalServerErrorException(error);
        }
    }

    async findQuestion(id: number): Promise<Question> {
        try {
            const question = await this.questionRepository.findOne({
                attributes: ['id', 'title', 'description', 'response'],
                where: { id },
            });

            if (!question) {
                throw new NotFoundException('Question Not Found');
            }

            return question
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findAllQuestion(): Promise<Question[]> {
        try {
            return await this.questionRepository.findAll({
                attributes: ['id', 'title', 'description', 'response']
            }).then((results) => {
                if (!results) return;

                return results
            }).catch(() => {
                throw new NotFoundException('Department Not Found');
            })
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async updateQuestion(id: number, data: UpdateQuestioDTO): Promise<Question> {
        const transaction = await this.sequelize.transaction();

        try {
            const question = await this.findQuestion(id);

            if (!question) {
                new NotFoundException('Question Not Found');
                return;
            }

            if (data) {
                await this.questionRepository.update(data, {
                    where: { id },
                    transaction
                }).then(async (result) => {
                    if (result) {
                        await transaction.commit();
                        return result
                    }
                });
            }
        } catch (error) {
            await transaction.rollback();
            throw new InternalServerErrorException(error);
        }
    }

    async deleteQuestion(id: number) {
        const transaction = await this.sequelize.transaction();

        try {
            const question = await this.findQuestion(id);

            if (question) {
                await this.questionRepository.destroy({
                    where: { id },
                    transaction
                });
                await transaction.commit();
            }
        } catch (error) {
            await transaction.rollback();
            throw new InternalServerErrorException(error);
        }
    }

    async insertOptions(data: Optional<any, string>): Promise<QuestionOption> {
        const transaction = await this.sequelize.transaction();

        try {
            const question = await this.findQuestion(data.question_id);

            if (!question) {
                new NotFoundException('Question Not Found');
                return
            }

            if (data) {
                await this.optionRepository.create(data, { transaction })
                    .then(async (result) => {
                        if (result) {
                            await transaction.commit();
                            return result
                        }
                    });
            }
        } catch (error) {
            await transaction.rollback();
            throw new InternalServerErrorException(error);
        }
    }
}
