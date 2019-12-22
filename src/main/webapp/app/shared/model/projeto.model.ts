import { IAplicacao } from 'app/shared/model/aplicacao.model';
import { IUser } from 'app/core/user/user.model';

export interface IProjeto {
  id?: number;
  nome?: string;
  chave?: string;
  aplicacaos?: IAplicacao[];
  criador?: IUser;
}

export class Projeto implements IProjeto {
  constructor(public id?: number, public nome?: string, public chave?: string, public aplicacaos?: IAplicacao[], public criador?: IUser) {}
}
