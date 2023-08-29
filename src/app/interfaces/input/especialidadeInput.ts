import { Especialidade } from '../dtos/especialidade';
export class EspecialidadeInput {
  especialidade: string = '';

  constructor(espec: any) {
    this.especialidade = espec.especialidade;
  }
}
