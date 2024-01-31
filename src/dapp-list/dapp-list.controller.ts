import { Controller, Get, Post, Body } from '@nestjs/common';
import { DappListService } from './dapp-list.service';
import { DappDataDTO, downLoadDTO } from './dto/dapp-list.dto';
import { list } from './data';

@Controller('dapp-list')
export class DappListController {
  constructor(private readonly dappListService: DappListService) {}

  // 激活app
  @Post('active')
  async active(@Body() createDappListDto: DappDataDTO) {
    const zipName = createDappListDto.dappName;
    const data = await this.dappListService.active(zipName);
    return {
      code: 200,
      data: data,
      message: true,
    };
  }

  @Get()
  findAll() {
    const resList = list.map((item) => {
      return {
        name: item.name,
        icon: item.icon,
        id: item.id,
        zipName: item.zipName,
      };
    });
    return {
      code: 200,
      data: resList,
      message: 'success',
    };
  }

  // 下载zip包
  @Get('download')
  async download(@Body() createDappListDto: downLoadDTO) {
    const id = createDappListDto.id;
    console.log('🚀  file: dapp-list.controller.ts:43  ', id);
    const data = await this.dappListService.download(id);
    // 给前端返回一个二进制流
    return {
      code: 200,
      data: data,
      message: true,
    };
  }
}
