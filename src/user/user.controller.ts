import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dtos/create-user.dto';
import { User } from './entities/user.entity';
import { ReturnUserDTO } from './dtos/return-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { Roles } from '../decorators/role.decorator';
import { UserType } from './enums/user.type';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {};

    @Post()
    async create(@Body() data: CreateUserDTO): Promise<User> {
        if (data) {
            return this.userService.create(data)
        }
    }

    @Get(':id')
    async findUser(@Param('id') id: number): Promise<ReturnUserDTO> {
        const user = await this.userService.findUserById(id);
        if (user) {
            return new ReturnUserDTO(user);
        }
    }

    @Roles(UserType.Admin)
    @Put(':id')
    async updateUser(
        @Body() data: UpdateUserDTO, 
        @Param('id') id: number
    ): Promise<ReturnUserDTO> {
        const user = await this.userService.updateUser(data, id);
        if (user) {
            return new ReturnUserDTO(user);
        }
    }
}
