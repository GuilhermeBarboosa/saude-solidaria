import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { UserMedicoInput } from '../interfaces/input/userMedicoInput';

@Injectable({
  providedIn: 'root'
})
export class UserMedicoService {

  constructor(private http: HttpClient) {}

  HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  });

  urlLocal = `${environment.api}/medico`;

  getById(id: number) {
    return this.http.get(`${this.urlLocal}/` + id);
  }

  create(userMedico: UserMedicoInput) {
    console.log(userMedico)
    return this.http.post(`${this.urlLocal}`, userMedico);
  }

  getAll() {
    return this.http.get(`${this.urlLocal}`);
  }

  edit(userMedico: UserMedicoInput, id: number) {
    console.log(userMedico)
    console.log(id)
    return this.http.put(`${this.urlLocal}/${id}`, userMedico);
  }

  ativar(id: number) {
    return this.http.put(`${this.urlLocal}/ativar/${id}`, null);
  }

  delete(id: number) {
    return this.http.delete(`${this.urlLocal}/${id}`);
  }


}
