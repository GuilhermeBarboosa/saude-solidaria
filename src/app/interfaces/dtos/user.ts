import { DefaultDto } from "./deafultDto";

export interface User extends DefaultDto{
    nome: string;
    cpf: string;
    email: string;
    senha: string;
    idRole: number;
    role: string;
}
