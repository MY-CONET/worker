import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // 前缀
  // 允许跨域访问
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.use('/uploads', express.static(`${__dirname}/../uploads`)); // 允许访问的静态资源
  app.use('/buildZipList', express.static(`${__dirname}/../buildZipList`)); // 允许访问的静态资源
  await app.listen(13001); // worker 主服务端口
}
bootstrap();
