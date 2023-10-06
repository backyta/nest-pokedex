import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  MONGODB: Joi.required(),
  PORT: Joi.number().default(3005),
  DEFAULT_LIMIT: Joi.number().default(6),
});

//? Que es Joi o para que nos sirve
//*

//* El configuration loader puede trabajar de la mano con joi tmb.

//* Lo que hace JoinValidationSchema, por ejemplo en el fedault_limit, cuando no exitste la varubale
//* de entorno la crea y la estableve en 6, y cuando llega al env.config, toma el valor de la env
//* creada en el joi.

//! tener cuidado porque joi al crear la variable, por mas de que la cree como numero, cuando llega
//! a setearse en las variables de entorno las crea como string, ya que todas son string aca y cuando
//! la toma del env.conf la toma como string. (lo manda o usa directamente de la variablke de entorno)
