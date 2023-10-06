import { Document } from 'mongoose';
import { SchemaFactory, Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class Pokemon extends Document {
  //id : string //Mongo me lo da

  @Prop({
    unique: true,
    index: true,
  })
  name: string;

  @Prop({
    unique: true,
    index: true,
  })
  no: number;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);

//* Una entidd hace referencia a una tabla o coleccion de una base de datos, y cada instancia de esta clase
//* hace referencia a un registro, fila o documento.

//* Para que sea un formato valido para mongo se extiende de Document de Monggose, al hacer esto, se aniade
//* todas las funcionalidades respectivas, como nombres, metodos, para trbajar de una manera facil.

//? Finalmente se exporta un esquema, este es el que le va decir cuando se este iniciando la DB, estas son las
//? definiciones que quiero que uses, reglas, etc.
