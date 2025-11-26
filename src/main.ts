import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Enable validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('TGlobal Patient Management API')
    .setDescription(
      'Comprehensive API for managing patients and consultation notes. ' +
        'This API provides full CRUD operations for patient records and their associated consultation notes. ' +
        'Features include patient filtering, search capabilities, and detailed consultation note management.',
    )
    .setVersion('1.0')
    .addTag('patients', 'Patient management endpoints - Create, read, update, and delete patient records')
    .addTag('consultation-notes', 'Consultation notes management - Manage medical consultation notes for patients')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger documentation available at: http://localhost:${port}/api`);
}
bootstrap();
