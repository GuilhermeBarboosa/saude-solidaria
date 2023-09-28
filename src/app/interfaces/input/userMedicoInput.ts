import { DefaultDto } from "../dtos/deafultDto";

export class UserMedicoInput{
  nome: string | undefined;
  cpf: string | undefined;
  email: string | undefined;
  senha: string | undefined;
  role: string | undefined;

  id_user: number | undefined;
  crm: string | undefined;
  especialidade: number | undefined;

  constructor(user: any) {
    this.nome = user.nome;
    this.cpf = user.cpf;
    this.email = user.email;
    this.senha = user.senha;
    this.id_user = user.id_user;
    this.role = user.role;
    this.crm = user.crm;
    this.especialidade = user.especialidade;
  }
}
