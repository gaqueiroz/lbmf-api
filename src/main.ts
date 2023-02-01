import * as dotenv from 'dotenv';

dotenv.config();

import { NestFactory } from '@nestjs/core';

import { DocsModule } from './docs/docs.module';
import { AppModule } from './app.module';

(async () => {
  const app = await NestFactory.create(AppModule, { cors: true });

  const docsModule = new DocsModule();

  await docsModule.setup(app);

  console.log(process.env.PORT, process.env.HOST);
  await app.listen(process.env.PORT, process.env.HOST);
})();
