import { Test, TestingModule } from '@nestjs/testing';
import { DappListService } from './dapp-list.service';

describe('DappListService', () => {
  let service: DappListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DappListService],
    }).compile();

    service = module.get<DappListService>(DappListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
