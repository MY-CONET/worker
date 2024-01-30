import { Module } from '@nestjs/common';
import { DappListService } from './dapp-list.service';
import { DappListController } from './dapp-list.controller';

@Module({
  controllers: [DappListController],
  providers: [DappListService],
})
export class DappListModule {}
