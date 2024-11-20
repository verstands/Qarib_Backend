import { Test, TestingModule } from '@nestjs/testing';
import { ProblemeController } from './probleme.controller';

describe('ProblemeController', () => {
  let controller: ProblemeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProblemeController],
    }).compile();

    controller = module.get<ProblemeController>(ProblemeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
