import { DefaultDto } from './deafultDto';

export interface Consulta extends DefaultDto {
  data: string;

  id_medico: number;
  crm: string;
  nome_medico: string;
  email_medico: string;
  cpf_medico: string;
  especialidade: string;

  id_local: number;
  rua: string;
  bairro: string;
  numero: string;
  nome_local: string;
}
