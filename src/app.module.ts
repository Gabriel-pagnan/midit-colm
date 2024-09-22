import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { DepartmentModule } from './department/department.module';
import { Department } from './department/entities/department.entity';
import { Question } from './question/entities/question.entity';
import { QuestionOption } from './question/entities/question-option.entity';
import { QuestionModule } from './question/question.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/role.guard';
import { JwtModule } from '@nestjs/jwt';
import { ErrorMiddleware } from './middlewares/error/error.middleware';
import { LogController } from './log/log.controller';

const models = [
  User, 
  Department, 
  Question, 
  QuestionOption
];

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env']
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      database: process.env.DATABASE_DB_NAME,
      host: process.env.DATABASE_HOST,
      password: process.env.DATABASE_PASSWORD,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_NAME,
      models,
      logging: false,
      autoLoadModels: Boolean(process.env.DATABASE_UPGRADE) || false,
      synchronize: Boolean(process.env.DATABASE_UPGRADE) || false,
    }),
    UserModule,
    DepartmentModule,
    QuestionModule,
    AuthModule,
    JwtModule
  ],
  controllers: [LogController],
  providers: [{
    provide: APP_GUARD,
    useClass: RolesGuard
  }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(ErrorMiddleware)
        .forRoutes('*')
  }
}
