export class UserInput {
  nome: string | undefined;

  cpf : string | undefined;

  email: string | undefined;

  senha: string | undefined ;

  role : number | undefined;


  constructor(user: any) {
    this.nome = user.nome;
    this.cpf = user.cpf;
    this.email = user.email;
    this.senha = user.senha;
    this.role = user.role!;
  }
}
