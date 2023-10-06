import axios, { AxiosInstance } from 'axios';
import { HttpAdapter } from '../interfaces/http-adapter.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AxiosAdapter implements HttpAdapter {
  private readonly axios: AxiosInstance = axios;

  async get<T>(url: string): Promise<T> {
    try {
      const { data } = await this.axios.get<T>(url);
      return data;
    } catch (error) {
      throw new Error(`This is an error - Checks Logs`);
    }
  }
}

//* Esta es mi clase adaptadora, envoltorio de mi codigo, el cual va ayudarme a que si Axios cambia,
//* solo cambie aqui.

//! Los Providers (Servicios, @Injectables) a diferencia de otro frameworks que trabajam con injectables
//! estos de aqui no estan a nivel de modulo, por lo tanto si quiero que este visible por otro
//! modulos debo de exportarlo e importarlo.
