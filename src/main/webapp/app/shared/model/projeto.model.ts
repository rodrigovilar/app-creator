import { IUser } from 'app/core/user/user.model';

export interface IProjeto {
  id?: number;
  nome?: string;
  chave?: string;
  criador?: IUser;
}

export class Projeto implements IProjeto {
  constructor(public id?: number, public nome?: string, public chave?: string, public criador?: IUser) {}
}
