import { Controller, Get, Post, Body } from '@nestjs/common';
import { DappListService } from './dapp-list.service';
import { DappDataDTO } from './dto/dapp-list.dto';

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
    const list = [
      {
        name: 'h5',
        icon: 'icon1.svg',
        url: '/h5/',
        zipHref: '/buildZipList/fruugo.zip',
        zipName: 'fruugo',
        id: '1',
      },
      {
        name: 'admin',
        icon: 'icon2.svg',
        url: '/admin/',
        zipHref: '/buildZipList/fruugo-admin.zip',
        zipName: 'fruugo-admin',
        id: '2',
      },
    ];
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
}
