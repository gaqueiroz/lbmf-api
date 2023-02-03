import { NestFactory } from '@nestjs/core';

import * as dotenv from 'dotenv';

import { DocsModule } from './docs/docs.module';
import { AppModule } from './app.module';

dotenv.config();

(async () => {
  const app = await NestFactory.create(AppModule, { cors: true });

  const docsModule = new DocsModule();

  await docsModule.setup(app);

  await app.listen(process.env.PORT, process.env.HOST);
})();
