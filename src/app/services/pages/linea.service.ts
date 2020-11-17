import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Linea} from '../../Models/linea';
@Injectable({
  providedIn: 'root'
})
export class LineaService {
  public API_URL= 'http://localhost:3000/api';
  constructor(private http:HttpClient) { }

  getLinea(){
    return this.http.get(`${this.API_URL}/linea`);
  }

  getOneLinea(id:number | string){
    return this.http.get(`${this.API_URL}/linea/${id}`);
  }

  createLinea(linea: Linea){
    return this.http.post(`${this.API_URL}/linea`,linea)
  }

  updateLinea(id:number | string, linea:Linea){
    return this.http.put(`${this.API_URL}/linea/${id}`,linea);
  }

  deleteLinea(id:number | string){
    return this.http.delete(`${this.API_URL}/linea/${id}`);
  }
}
