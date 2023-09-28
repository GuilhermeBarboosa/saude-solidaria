export class ConsultaInput {
  data: string = '';
  medico: number = 0;
  local: number = 0;

  constructor(consulta: any) {
    this.data = consulta.data;
    this.medico = consulta.medico;
    this.local = consulta.local;
  }
}
