import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for mobile app
  app.enableCors();

  // Enable global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Uniti Tracking API')
    .setDescription(
      'Backend service for collecting and managing user tracking data from the Uniti Android app.',
    )
    .setVersion('1.0')
    .addTag('sms-transactions', 'SMS transaction parsing & storage')
    .addTag('locations', 'Location tracking')
    .addTag('phone-usage', 'Call & SMS metadata')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
