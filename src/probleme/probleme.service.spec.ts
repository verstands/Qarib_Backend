import { Test, TestingModule } from '@nestjs/testing';
import { ProblemeService } from './probleme.service';

describe('ProblemeService', () => {
  let service: ProblemeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProblemeService],
    }).compile();

    service = module.get<ProblemeService>(ProblemeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
