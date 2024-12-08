import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

import { ISwaggerConfigInterface } from './swagger-config.interface';

export function setupSwagger(
  app: INestApplication,
  config: ISwaggerConfigInterface,
) {
  const options: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle(config.title)
    .setDescription(config.description)
    .setVersion(config.version)
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'token',
    )
    .addServer(`${config.scheme}://localhost:5000`)
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(config.path, app, document);
}
