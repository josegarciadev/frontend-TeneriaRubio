import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Producto} from '../../Models/producto';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  public API_URL= 'http://localhost:3000/api';
  constructor(private http:HttpClient) { }

  getProd(){
    return this.http.get(`${this.API_URL}/productos`);
  }

  getOneProd(id:number | string){
    return this.http.get(`${this.API_URL}/productos/getone/${id}`);
  }
  getProductos(){
    return this.http.get(`${this.API_URL}/productos/producto`);
  }

  createProd(prod: Producto){
    return this.http.post(`${this.API_URL}/productos`,prod)
  }

  updateProd(id:number | string, prod:Producto){
    return this.http.put(`${this.API_URL}/productos/${id}`,prod);
  }

  deleteProd(id:number | string){
    return this.http.delete(`${this.API_URL}/productos/${id}`);
  }
}
