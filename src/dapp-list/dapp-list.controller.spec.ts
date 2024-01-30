import { Test, TestingModule } from '@nestjs/testing';
import { DappListController } from './dapp-list.controller';
import { DappListService } from './dapp-list.service';

describe('DappListController', () => {
  let controller: DappListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DappListController],
      providers: [DappListService],
    }).compile();

    controller = module.get<DappListController>(DappListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
