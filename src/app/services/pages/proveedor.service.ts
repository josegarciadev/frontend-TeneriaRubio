import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Proveedor} from '../../Models/proveedor';
@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  public API_URL= 'http://localhost:3000/api';
  constructor(private http:HttpClient) { }

  getProv(){
    return this.http.get(`${this.API_URL}/proveedor`);
  }

  getOneProv(id:number | string){
    return this.http.get(`${this.API_URL}/proveedor/getone/${id}`);
  }
  getProveedores(){
    return this.http.get(`${this.API_URL}/proveedor/proveedor`);
  }

  createProv(dep: Proveedor){
    return this.http.post(`${this.API_URL}/proveedor`,dep)
  }

  updateProv(id:number | string, dep:Proveedor){
    return this.http.put(`${this.API_URL}/proveedor/${id}`,dep);
  }

  deleteProv(id:number | string){
    return this.http.delete(`${this.API_URL}/proveedor/${id}`);
  }
}
