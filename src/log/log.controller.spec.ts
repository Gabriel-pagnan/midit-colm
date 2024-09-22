import { Test, TestingModule } from '@nestjs/testing';
import { LogController } from './log.controller';

describe('LogController', () => {
  let controller: LogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogController],
    }).compile();

    controller = module.get<LogController>(LogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should log an error and return a success message', () => {
    const errorData = {
      error: 'Error test',
      stack: 'Stack trace test',
    };

    const response = controller.logError(errorData);
    expect(response).toEqual({ message: 'Error logged successfully!' });
  });
});
