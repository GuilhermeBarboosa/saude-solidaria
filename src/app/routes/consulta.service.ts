import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { ConsultaInput } from '../interfaces/input/consultaInput';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  constructor(private http: HttpClient) {}

  HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  });

  urlConsulta = `${environment.api}/consulta`;

  getById(id: number) {
    return this.http.get(`${this.urlConsulta}/` + id);
  }

  create(consulta: ConsultaInput) {
    return this.http.post(`${this.urlConsulta}`, consulta);
  }

  getAll() {
    return this.http.get(`${this.urlConsulta}`);
  }

  edit(consulta: ConsultaInput, id: number) {
    return this.http.put(`${this.urlConsulta}/${id}`, consulta);
  }

  ativar(id: number) {
    return this.http.put(`${this.urlConsulta}/ativar/${id}`, null);
  }

  delete(id: number) {
    return this.http.delete(`${this.urlConsulta}/${id}`);
  }



}
