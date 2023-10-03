import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  formatarData(data: any) {
    const date = new Date(data);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const formatted = `${day}/${month}/${year}`;
    return formatted;
  }

  formatarDataToSQL(data: any) {
    data = data.split("/").reverse().join("/");
    data = new Date(data);
    return data;
  }

  formatterString(string: String) {
    string = string.toLowerCase();
    string = string.replace(/(^\w{1})|(\s+\w{1})/g, (letra) =>
      letra.toUpperCase()
    );

    return string;
  }

  validarData(data: string): boolean {
    const dataSplit = data.split('/');

    // Valida o formato da data
    if (dataSplit.length !== 3) {
      return false;
    }

    console.log(dataSplit)

    // Valida o dia
    const dia = Number(dataSplit[0]);
    if (dia < 1 || dia > 31) {
      return false;
    }

    // Valida o mês
    const mes = Number(dataSplit[1]);
    if (mes < 1 || mes > 12) {
      return false;
    }

    // Valida o ano
    const ano = Number(dataSplit[2]);
    if (ano < 1900 || ano > 3000) {
      return false;
    }

    const dataString = new Date(`${ano}-${mes}-${dia}`);

    const dataAtual = Date.now();

    const dataStringEmMilissegundos = dataString.getTime();
    const dataAtualEmMilissegundos = dataAtual;

    if (dataStringEmMilissegundos < dataAtualEmMilissegundos) {
     return false
    }

    return true;
  }
}
