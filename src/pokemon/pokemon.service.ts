import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { PaginadtionDto } from '../common/dto/pagination.dto';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name) // nombre del modelo que queremos usar(Pokemon-clase)
    private readonly pokemonModel: Model<Pokemon>, // Llamamos Model y le pasamos el generico como lucira(Pokemon)
  ) {}

  //* Methods

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {
      //Insercion to DB
      const pokemon = await this.pokemonModel.create(createPokemonDto); // create new document to coleecion de la entity
      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll(paginadtionDto: PaginadtionDto) {
    const { limit = 10, offset = 0 } = paginadtionDto;

    return this.pokemonModel
      .find()
      .limit(limit)
      .skip(offset)
      .sort({ no: 1 })
      .select('-__v');
  }

  async findOne(term: string) {
    let pokemon: Pokemon; // tipo de la entidad(modelo)

    if (!isNaN(+term)) {
      // si es un numero
      pokemon = await this.pokemonModel.findOne({ no: term });
    }

    // MongoID - validacion id mongo, para no hacer doble evalucacion aqui usamor el !pokemon para que no entre.
    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }

    // Name
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({
        name: term.toLocaleLowerCase().trim(),
      });
    }

    if (!pokemon)
      throw new NotFoundException(
        `Pokemon with id, name or no "${term} not found"`,
      );
    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);

    if (updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();

    try {
      await pokemon.updateOne(updatePokemonDto); //`new` retornamos el nuevo objeto actualizado

      return { ...pokemon.toJSON(), ...updatePokemonDto }; //sobreescribimos y retornamo el nuevo actualizado
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    // const pokemon = await this.findOne(id);
    // await pokemon.deleteOne();
    // return {id};
    // const result = await this.pokemonModel.findByIdAndDelete(id); // una sola consulta por id en la DB, busca y elimina
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });

    if (deletedCount === 0)
      throw new BadRequestException(`Pokemon with id "${id}" not found`);

    return;
  }

  //* Properties

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Pokemon exist in DB ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(
      `Can update pokemon - Check server logs`,
    );
  }
}

//? Inyectar Dependencia de Model<Pokemon>
//* El problema con esto, es que el Model por si solo no es inyectable (@Injectable) o sea no es un servicio
//* o provider, no se puede inyectar asi.

//! Para Injectarlo de una manera controlada basada en Nest, se debe anteponer el decorador @InjectableModel,
//! pasando como parametro el nombre del modelo a inyectar.

//? Reutilizar el findOne()
//* utilizamos el metodo de busqueda `finOne` para validar todos los posibles terms(id, no, name)
//* y lanzar excepciones si no lo encuentra, y si encuentra aca queda el codigo.
