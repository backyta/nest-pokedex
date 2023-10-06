export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  mongodb: process.env.MONGODB,
  port: process.env.PORT || 3002,
  default_limit: +process.env.DEFAULT_LIMIT || 7,
});

//* Aqui mapeamos nuestras variables de entorno a un objeto de nuestra configiracionde varibales de entorno

//! Este nos sirve para decirle a Nest y espcificamente al modulo de la configuraciond de variables de
//! entorno, que va usar este archivo para validar nuestras variables de entorno.

//? Cuando estamos dentro de nuestros Building Blocks, sevivios o cualquier coas que nos permita hacer
//? iyeccion de dependencias, no lo vamos hacer directamente del process.env, lo vamos hacer mediante un
//? servicio que el config.module nos ofrece, proque el `config module`, es quien proceso, valido y ejecuto
//? para preparar nuestras variables de entorno

//* Colocar un + porque al psar por el Joi crea la variable de entorno como numero pero, lo setea
//* en las variables de entorno, y al usarlo aqui los usa como string(forma nativa), por eso
//* se debe converitir

//* Aunque gracias ala tranformacion gobal en el main.ts, se espera que la data sea del tipo esperado
//* segun el DTO asi que se trasnforma.
