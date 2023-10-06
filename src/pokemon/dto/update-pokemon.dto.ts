import { PartialType } from '@nestjs/mapped-types';
import { CreatePokemonDto } from './create-pokemon.dto';

export class UpdatePokemonDto extends PartialType(CreatePokemonDto) {}

//* Extiende todas las propuedades de createPokemon con la unica condicion que seran opcionales,
//* porque en algunas actualizaciones, algunas propiedades pueden ser opcionales, no todas cambian
