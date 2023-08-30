import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { LocalInput } from '../interfaces/input/localInput';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor(private http: HttpClient) {}

  HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  });

  urlLocal = `${environment.api}/local`;

  getById(id: number) {
    return this.http.get(`${this.urlLocal}/` + id);
  }

  create(local: LocalInput) {
    return this.http.post(`${this.urlLocal}`, local);
  }

  getAll() {
    return this.http.get(`${this.urlLocal}`);
  }

  edit(local: LocalInput, id: number) {
    return this.http.put(`${this.urlLocal}/${id}`, local);
  }

  ativar(id: number) {
    return this.http.put(`${this.urlLocal}/ativar/${id}`, null);
  }

  delete(id: number) {
    return this.http.delete(`${this.urlLocal}/${id}`);
  }


}
