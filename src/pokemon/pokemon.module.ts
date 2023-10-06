import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Pokemon.name, // sale de la extension del Document, es el nombre de la clase, lo devuelvo como cadena de texto
        schema: PokemonSchema,
      },
    ]),
  ],
})
export class PokemonModule {}

//? MongooseModule.forFeature
//* Registra modelo de de datos en con contexto de Mongoose, se proporciona el nombre del modelo y el esquema
//* que manejara, mongoose sera consiente de la estructura de datos y como deben interactuar con ella en la DB.

//* Posteriormente, en tu aplicación NestJS, puedes inyectar el modelo Pokemon en tus servicios o controladores.
//* Esto te permitirá utilizar ese modelo para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en la base
//* de datos relacionadas con los Pokémon. Puedes crear nuevos registros, consultar datos existentes, actualizar
//* registros y eliminarlos utilizando este modelo y las funciones proporcionadas por Mongoose.

//! Podemos seguir definiendo o registrando mas modelo, en esta parte, siempre y cuando tengan relacion con Pokemon

//? Luego se puede hacee tmb, como relacionar estos modelos en otros modulos fuera de este.
