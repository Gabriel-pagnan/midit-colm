import { BadGatewayException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { Repository, Sequelize } from 'sequelize-typescript';
import { CreateUserDTO } from './dtos/create-user.dto';
import { createPasswordHashed } from '../helper/password';
import { UpdateUserDTO } from './dtos/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User)
        private readonly userRepository: Repository<User>,
        private readonly sequelize: Sequelize
    ) { }

    async create(data: CreateUserDTO): Promise<User> {
        const transaction = await this.sequelize.transaction();

        try {
            const user = await this.findUserByEmail(data.email).catch(() => undefined);

            if (user) {
                throw new BadGatewayException('E-mail já cadastrado');
            }

            const passwordHash = await createPasswordHashed(data.password);

            const entity = {
                ...data,
                password: passwordHash,
            }

            await this.userRepository.create(entity, { transaction: transaction });
            await transaction.commit();
            return
        } catch (error) {
            await transaction.rollback();
            throw new InternalServerErrorException(error);
        }
    }

    async findUserByEmail(email: string): Promise<User> {
        try {
            const user = await this.userRepository.findOne({
                where: { email }
            });

            if (!user) return;

            return user
        } catch (error) {
            throw new NotFoundException('E-mail já cadastrado.')
        }
    }

    async findUserById(id: number): Promise<User> {
        try {
            const user = await this.userRepository.findOne({
                where: { id }
            });

            if (!user) throw new NotFoundException('User Not Found.');

            return user
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async updateUser(data: UpdateUserDTO, id: number): Promise<User> {
        const transaction = await this.sequelize.transaction();

        try {
            const user = await this.findUserById(id).catch(() => undefined);

            if (!user) throw new NotFoundException('User Not Found.');

            if (data.password) {
                data.password = await createPasswordHashed(data.password);
            }

            await this.userRepository.update(data, {
                where: { id },
                transaction
            });

            await transaction.commit();
            return
        } catch (error) {
            await transaction.rollback();
            throw new InternalServerErrorException(error);
        }
    }
}
