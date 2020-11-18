import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SalidaEmpleado} from '../../Models/salidaEmpleado';
@Injectable({
  providedIn: 'root'
})
export class SalidaempleadoService {
  public API_URL= 'http://localhost:3000/api';
  
  constructor(private http: HttpClient) { }

  getSalEmp(){
    return this.http.get(`${this.API_URL}/salEmp`);
  }

  getOneSalEmp(id:number | string){
    return this.http.get(`${this.API_URL}/salEmp/${id}`);
  }

  createSalEmp(emp: SalidaEmpleado){
    return this.http.post(`${this.API_URL}/salEmp`,emp)
  }

  updateSalEmp(id:number | string, emp:SalidaEmpleado){
    return this.http.put(`${this.API_URL}/salEmp/${id}`,emp);
  }

  deleteSalEmp(id:number | string){
    return this.http.delete(`${this.API_URL}/salEmp/${id}`);
  }
}
