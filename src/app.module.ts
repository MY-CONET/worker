import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DappListModule } from './dapp-list/dapp-list.module';

@Module({
  imports: [DappListModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
