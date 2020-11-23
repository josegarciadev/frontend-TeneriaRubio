import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuditoriasRecursosHService {
  public API_URL= 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }

  
  getEntrada(){
    return this.http.get(`${this.API_URL}/auditre/entrada/`);
  }
  
  getSalida(){
    return this.http.get(`${this.API_URL}/auditre/salida/`);
  }
  getEmpleado(){
    return this.http.get(`${this.API_URL}/auditre/empleados/`);
  }
}