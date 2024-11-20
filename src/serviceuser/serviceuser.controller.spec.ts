import { Test, TestingModule } from '@nestjs/testing';
import { ServiceuserController } from './serviceuser.controller';

describe('ServiceuserController', () => {
  let controller: ServiceuserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceuserController],
    }).compile();

    controller = module.get<ServiceuserController>(ServiceuserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
