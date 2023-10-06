import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';

@Module({
  imports: [
    //Config env
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),
    //Pueden trabajar en conjunto porque el load, hace conversiones y mapeos, y el schema tmb
    //hace algo similar(estalecer valores por defecto, si no vienen env var) pero pueden trbajar juntos.

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    //Connect DB
    MongooseModule.forRoot(process.env.MONGODB, {
      dbName: 'pokemonsDB', // usamos la conexion y creamos los medelos, dentro de la DB(pokemonDB)
    }),
    PokemonModule,
    CommonModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  // constructor() {
  //   console.log(process.env);
  // } // para mostrar en consola las variables de entorno
}

//! Buildindg block hace referencia a un provider, servicio, controlador o cualquier otra cosa que nos
//! permita hacer inyeccion de dependencias.
