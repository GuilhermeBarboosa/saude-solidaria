import { DefaultDto } from './deafultDto';

export interface UserMedico extends DefaultDto {
  crm: string;

  id_user: number;
  nome_user: string;
  cpf_user: string;
  email_user: string;

  id_role: number;
  role: string;

  id_especialidade: number;
  especialidade: string;
}
