import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Notes API')
    .setDescription('The notes API description')
    .setVersion('1.0')
    .setBasePath('api')
    .build();
  app.setGlobalPrefix('api');

  const document = SwaggerModule.createDocument(app, config, { ignoreGlobalPrefix: false });
  SwaggerModule.setup('api', app, document);
  app.enableShutdownHooks();
  await app.listen(process.env.PORT || 3007).then(() => {
    console.log('PORT')
  });

}
bootstrap();
