import { Test, TestingModule } from '@nestjs/testing';
import { FavoriController } from './favori.controller';

describe('FavoriController', () => {
  let controller: FavoriController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoriController],
    }).compile();

    controller = module.get<FavoriController>(FavoriController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
