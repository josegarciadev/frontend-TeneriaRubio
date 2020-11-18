import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EntradaEmpleado} from '../../Models/entradaEmpleado';
@Injectable({
  providedIn: 'root'
})
export class EntradaempleadosService {
  public API_URL= 'http://localhost:3000/api';
  
  constructor(private http: HttpClient) { }

  getEntEmp(){
    return this.http.get(`${this.API_URL}/entEmp`);
  }

  getOneEntEmp(id:number | string){
    return this.http.get(`${this.API_URL}/entEmp/${id}`);
  }

  createEntEmp(emp: EntradaEmpleado){
    return this.http.post(`${this.API_URL}/entEmp`,emp)
  }

  updateEntEmp(id:number | string, emp:EntradaEmpleado){
    return this.http.put(`${this.API_URL}/entEmp/${id}`,emp);
  }

  deleteEntEmp(id:number | string){
    return this.http.delete(`${this.API_URL}/entEmp/${id}`);
  }
}
