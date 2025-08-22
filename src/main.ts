import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  
  const port = configService.get<number>('PORT') || 3000;

  // Temporary: Allow all origins for testing
  app.enableCors({
    origin: true, // This allows all origins - use only for testing!
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
    credentials: true,
  });

  await app.listen(port);
  console.log(`NestJS server running on port ${port} with CORS enabled for all origins`);
}

bootstrap();