/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import * as compressing from 'compressing';

import * as http from 'http';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

import * as net from 'net';

@Injectable()
export class DappListService {
  // 激活app
  async active(zipName: string) {
    const zipPath = `buildZipList/${zipName}.zip`; // zip 包路径
    const originPath = `buildZipList/${zipName}`; // 解压路径
    // 将压缩包解压到 压缩包同目录的 文件夹中
    await compressing.zip.uncompress(zipPath, originPath);
    const port = 13002;
    const server = http.createServer((req, res) => {
      let filePath = originPath + req.url;
      if (filePath === `${originPath}/`) {
        filePath = `${originPath}/index.html`;
      }
      const extname = path.extname(filePath);
      let contentType = 'text/html';
      switch (extname) {
        case '.js':
          contentType = 'text/javascript';
          break;
        case '.css':
          contentType = 'text/css';
          break;
        case '.json':
          contentType = 'application/json';
          break;
        case '.png':
          contentType = 'image/png';
          break;
        case '.jpg':
          contentType = 'image/jpg';
          break;
        case '.svg':
          contentType = 'image/svg+xml';
          break;
        case '.wav':
          contentType = 'audio/wav';
          break;
      }

      fs.readFile(filePath, (error, content) => {
        if (error) {
          if (error.code === 'ENOENT') {
            res.writeHead(404);
          } else {
            res.writeHead(500);
            res.end('Internal Server Error');
          }
        } else {
          res.writeHead(200, { 'Content-Type': contentType });
          res.end(content, 'utf-8');
        }
      });
    });

    server.listen(port, () => {
      console.log(`> Local: http://127.0.0.1:${port}`);
    });

    const webServer = `http://127.0.0.1:${port}`;
    return webServer;
  }
}
