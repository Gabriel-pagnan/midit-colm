import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Department } from './entities/department.entity';
import { Repository, Sequelize } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { Question } from '../question/entities/question.entity';

@Injectable()
export class DepartmentService {
    constructor(
        @InjectModel(Department)
        private readonly departmentRepository: Repository<Department>,
        private readonly sequelize: Sequelize
    ) { }

    async create(data: Optional<any, string>): Promise<Department> {
        const transaction = await this.sequelize.transaction();

        try {
            const department = await this.departmentRepository.create(data,
                { transaction }
            );

            await transaction.commit();
            return department
        } catch (error) {
            await transaction.rollback();
            throw new InternalServerErrorException(error);
        }
    }

    async findDepartment(id: number): Promise<Department> {
        try {
            const department = await this.departmentRepository.findOne({
                where: { id },
                attributes: ['id', 'name', 'description'],
                include: {
                    model: Question,
                    as: 'questions',
                    attributes: ['id', 'title', 'description', 'response'],
                    required: false
                },
            });
        
            if (!department) {
                throw new NotFoundException('Department Not Found');
            }

            return department
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findAllDepartments(): Promise<Department[]> {
        try {
            return await this.departmentRepository.findAll({
                attributes: ['id', 'name', 'description'],
                include: [{
                    model: Question,
                    as: 'questions',
                    attributes: ['id', 'title', 'description', 'response'],
                    required: false
                }]
            }).then((results) => {
                if (results && results.length) {
                    return results
                }
            }).catch(() => {
                throw new NotFoundException('Department Not Found');
            })
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

}
