import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

import { RedocModule, RedocOptions } from 'nestjs-redoc';

import { theme } from './docs.theme';
import {
  DOCS_DESCRIPTION,
  DOCS_LOGO_URL,
  DOCS_ROUTE,
  DOCS_TITLE,
  DOCS_VERSION,
} from './docs.constants';

export class DocsModule {
  public async setup(app: INestApplication): Promise<void> {
    const options = new DocumentBuilder()
      .setTitle(DOCS_TITLE)
      .setDescription(DOCS_DESCRIPTION)
      .setVersion(DOCS_VERSION)
      .build();

    const document = SwaggerModule.createDocument(app, options);

    const docOptions: RedocOptions = {
      title: DOCS_TITLE,
      logo: {
        url: DOCS_LOGO_URL,
        altText: DOCS_TITLE,
        backgroundColor: theme.colors.primary.main as string,
      },
      sortPropsAlphabetically: false,
      hideDownloadButton: true,
      hideHostname: false,
      disableSearch: false,
      pathInMiddlePanel: true,
      showExtensions: true,
      supressWarnings: true,
      theme,
    };

    await RedocModule.setup(DOCS_ROUTE, app as any, document, docOptions);
  }
}
