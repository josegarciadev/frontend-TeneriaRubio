import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Empleados} from '../../Models/empleados';
@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  public API_URL= 'http://localhost:3000/api';
  
  constructor(private http: HttpClient) { }

  getEmp(){
    return this.http.get(`${this.API_URL}/emp`);
  }

  getOneEmp(id:number | string){
    return this.http.get(`${this.API_URL}/emp/${id}`);
  }

  createEmp(emp: Empleados){
    return this.http.post(`${this.API_URL}/emp`,emp)
  }

  updateEmp(id:number | string, emp:Empleados){
    return this.http.put(`${this.API_URL}/emp/${id}`,emp);
  }

  deleteEmp(id:number | string){
    return this.http.delete(`${this.API_URL}/emp/${id}`);
  }
}
