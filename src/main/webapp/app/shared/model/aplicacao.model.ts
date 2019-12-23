import { IProjeto } from 'app/shared/model/projeto.model';

export interface IAplicacao {
  id?: number;
  nome?: string;
  chave?: string;
  projeto?: IProjeto;
}

export class Aplicacao implements IAplicacao {
  constructor(public id?: number, public nome?: string, public chave?: string, public projeto?: IProjeto) {}
}
