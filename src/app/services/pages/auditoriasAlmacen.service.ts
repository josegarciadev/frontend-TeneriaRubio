import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuditoriasAlmacenService {
  public API_URL= 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }

  
  getEntsal(){
    return this.http.get(`${this.API_URL}/audital/entsal/`);
  }
  getSesiones(){
    return this.http.get(`${this.API_URL}/audital/sesiones/`);
  }
  
  getEntSalUp(){
    return this.http.get(`${this.API_URL}/audital/entsalup/`);
  }
  getUser(){
    return this.http.get(`${this.API_URL}/audital/usuarios/`);
  }

}
