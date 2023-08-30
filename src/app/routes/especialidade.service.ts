import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { EspecialidadeInput } from '../interfaces/input/especialidadeInput';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadeService {

  constructor(private http: HttpClient) {}

  HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  });

  urlEspec = `${environment.api}/especialidade`;

  getById(id: number) {
    return this.http.get(`${this.urlEspec}/` + id);
  }

  create(espec: EspecialidadeInput) {
    return this.http.post(`${this.urlEspec}`, espec);
  }

  getAll() {
    return this.http.get(`${this.urlEspec}`);
  }

  edit(espec: EspecialidadeInput, id: number) {
    return this.http.put(`${this.urlEspec}/${id}`, espec);
  }

  ativar(id: number) {
    return this.http.put(`${this.urlEspec}/ativar/${id}`, null);
  }

  delete(id: number) {
    return this.http.delete(`${this.urlEspec}/${id}`);
  }

}
