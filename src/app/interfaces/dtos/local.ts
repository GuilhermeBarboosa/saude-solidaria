import { DefaultDto } from "./deafultDto";

export interface Local extends DefaultDto{
  nome_local: string;
  rua: string;
  numero: string;
  bairro: string;
}
