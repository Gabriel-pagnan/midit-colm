import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Question } from './entities/question.entity';
import { DepartmentModule } from '../department/department.module';
import { QuestionOption } from './entities/question-option.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([Question, QuestionOption]), 
    JwtModule,
    DepartmentModule
  ],
  controllers: [QuestionController],
  providers: [QuestionService],
  exports: [QuestionService]
})
export class QuestionModule {}
