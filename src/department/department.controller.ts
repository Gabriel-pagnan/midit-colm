import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { ReturnDepartmentDTO } from './dtos/return-department.dto';
import { Department } from './entities/department.entity';
import { Optional } from 'sequelize';

@Controller('departments')
export class DepartmentController {
    constructor(
        private readonly departmentService: DepartmentService
    ) {}

    @Post()
    @HttpCode(201)
    async create(@Body() data: Optional<any, string>): Promise<Department> {
        return this.departmentService.create(data);
    }

    @Get(':id')
    async findDepartment(@Param('id') id: number): Promise<ReturnDepartmentDTO> {
        const department = await this.departmentService.findDepartment(id);
        return new ReturnDepartmentDTO(department);
    }

    @Get()
    async findAllDepartments(): Promise<ReturnDepartmentDTO[]> {
        return (
            await this.departmentService.findAllDepartments()).map((department) => 
                new ReturnDepartmentDTO(department)
        )
    }
}
