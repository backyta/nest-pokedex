import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
// import { PokemonService } from 'src/pokemon/pokemon.service';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  //* Hecho mediente Modelo, pero tmb se puede mediante servicio
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany(); //elimina todas

    //* Utilizando la inyeccion y el patron Adaptador para Axios
    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    //! Haciendo multiples inseciones, pero creando una sola insercion para la DB
    const pokemonToInsert: { name: string; no: number }[] = [];

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');

      const no = +segments[segments.length - 2];

      console.log({ name, no });
      pokemonToInsert.push({ name, no }); // [{name: charmander, no: 4}....{}]
    });
    await this.pokemonModel.insertMany(pokemonToInsert);
    return 'Seed Exceuted';
  }
}

//? Manera de hacerlo con multiples inserciones y con Promise.All
// const insertPromiseArray = [];

// data.results.forEach(({ name, url }) => {
//   const segments = url.split('/');

//   const no = +segments[segments.length - 2];

//   console.log({ name, no });
//   //create
//   //const pokemon = await this.pokemonModel.create({ name, no });// con esto esperamos a que termine cada una
//   insertPromiseArray.push(this.pokemonModel.create({ name, no })); // retorna promesa
// });
// //* Todas se ejecutan de manera simultanea, sine sperar que la anterior termine(rendimiento)
// await Promise.all(insertPromiseArray); // aca se resuelven todas las promesas

//@Inject() //para marca la clase como inyectada y crear su instancia, aunque no es necesario explicitamente
//private readonly pokemonService: PokemonService //! otra manera mediante el servicio
