import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v2');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();

//? Colocar de manera global o anteporner el /api para mis rutas, asi solo cambiamos en un solo lugar.

//! En los pipes globales, se puede trasnformar los DTOs en el tipo de dato que estanos esperando, sus pro
//! es que es mas facil de validar la parte de la data del DTO porque ya viene con la apraciencia desea.

//* Pero lo malo es que si va informacion, va tener que procesarla y generar la instancia y eso es un poco
//* mas de consumo de memoria al hacerlo asi.

//* Usando el transform y transformOptions se puede convertir de manera global al tipo de dato que estamos
//* esperado.
