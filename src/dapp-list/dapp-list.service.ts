/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import * as compressing from 'compressing';

import * as http from 'http';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

import * as net from 'net';

import * as express from 'express';
const app = express();
@Injectable()
export class DappListService {
  // 激活app
  async active(zipName: string) {
    const zipPath = `buildZipList/${zipName}.zip`; // zip 包路径
    // 将zip包 转为二进制流
    const data = fs.readFileSync(zipPath);
    return data;
  }

  // 创建一个 web 服务器 用于启动应用
  async createServer(port: number, webServerPath: string) {
    // 使用 express 启动一个静态资源服务器，将解压后的文件夹作为静态资源目录
    app.use(express.static(webServerPath));
    // web服务为history模式
    app.get('*', (req, res) => {
      const html = fs.readFileSync(
        path.resolve(webServerPath, 'index.html'),
        'utf-8',
      );
      res.send(html);
    });

    // 启动服务
    const server = http.createServer(app);
    server.listen(port, () => {
      console.log(`> Local: http://127.0.0.1:${port}`);
    });
    const webServer = `http://127.0.0.1:${port}`;
    return webServer;
  }

  // 下载zip包
  async download(zipName: string) {
    const zipPath = `buildZipList/${zipName}.zip`; // zip 包路径
    const originPath = `buildZipList/${zipName}`; // 解压路径
    // 将压缩包解压到 压缩包同目录的 文件夹中
    await compressing.zip.uncompress(zipPath, originPath);
    const port = 13002;

    // 如果端口已经被占用,就

    const webServer = await this.createServer(port, originPath);
    return webServer;
  }
}
