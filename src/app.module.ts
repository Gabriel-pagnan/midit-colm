import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';

const models = [User]

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
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
