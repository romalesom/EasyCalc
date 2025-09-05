// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Globales Prefix mit Versionierung
  const globalPrefix = 'api/v1';
  app.setGlobalPrefix(globalPrefix);

  // CORS aktivieren
  app.enableCors();

  // Swagger/OpenAPI Setup
  // const config = new DocumentBuilder()
  //   .setTitle('EasyCalc API')
  //   .setDescription('REST API für EasyCalc')
  //   .setVersion('1.0')
  //   .addBearerAuth() // Keycloak JWT Auth
  //   .build();

  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api/docs', app, document);

  // Server starten
  await app.listen(process.env.PORT || 3001);
  console.log(`Server läuft auf http://localhost:${process.env.PORT || 3001}/${globalPrefix}`);
  console.log(`Swagger Docs: http://localhost:${process.env.PORT || 3001}/api/docs`);
}

bootstrap();

