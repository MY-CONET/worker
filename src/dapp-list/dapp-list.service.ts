import { Injectable } from '@nestjs/common';
import * as compressing from 'compressing';

import * as http from 'http';
// import * as httpProxy from 'http-proxy';

@Injectable()
export class DappListService {
  // 激活app
  async active(zipName: string) {
    const zipPath = `buildZipList/${zipName}.zip`; // zip 包路径
    const originPath = `buildZipList/${zipName}`; // 解压路径
    // 将压缩包解压到 压缩包同目录的 文件夹中
    await compressing.zip.uncompress(zipPath, originPath);

    const port = 13002;

    const server = http.createServer((request, response) => {
      response.writeHead(200, {
        'Content-Type': 'text/plain;charset=utf-8',
      });
      response.end('欢迎访问');
    });

    server.listen(port, () => {
      console.log(`> Local: http://127.0.0.1:${port}`);
    });

    const webServer = `http://127.0.0.1:${port}`;
    return webServer;
  }
}
