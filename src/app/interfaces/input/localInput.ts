
export class LocalInput {
  nome_local: string = '';
  rua: string = '';
  bairro: string = '';
  numero: string = '';

  constructor(local: any) {
    this.nome_local = local.nome_local;
    this.rua = local.rua;
    this.bairro = local.bairro;
    this.numero = local.numero;
  }
}
