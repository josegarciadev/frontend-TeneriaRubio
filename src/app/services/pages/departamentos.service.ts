import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Departamentos} from '../../Models/departamentos';
@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {
  public API_URL= 'http://localhost:3000/api';
  constructor(private http:HttpClient) { }

  getDep(){
    return this.http.get(`${this.API_URL}/dep`);
  }

  getOneDep(id:number | string){
    return this.http.get(`${this.API_URL}/dep/${id}`);
  }

  createDep(dep: Departamentos){
    return this.http.post(`${this.API_URL}/dep`,dep)
  }

  updateDep(id:number | string, dep:Departamentos){
    return this.http.put(`${this.API_URL}/dep/${id}`,dep);
  }

  deleteDep(id:number | string){
    return this.http.delete(`${this.API_URL}/dep/${id}`);
  }
}
