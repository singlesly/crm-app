import { NestFactory } from '@nestjs/core';
import { AppModule } from "./AppModule";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

(async () => {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
      .setTitle('CRM API')
      .setDescription('The CRP API description')
      .setVersion('1.0')
      .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/documentation', app, document);
  await app.listen(3000);
})()

