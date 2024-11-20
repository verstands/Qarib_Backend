import { Test, TestingModule } from '@nestjs/testing';
import { ServiceuserService } from './serviceuser.service';

describe('ServiceuserService', () => {
  let service: ServiceuserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceuserService],
    }).compile();

    service = module.get<ServiceuserService>(ServiceuserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
