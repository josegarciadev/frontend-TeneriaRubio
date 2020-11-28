import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EntradaLinea} from '../../Models/entradaLinea';
@Injectable({
  providedIn: 'root'
})
export class EntradalineaService {

  public API_URL= 'http://localhost:3000/api';
  constructor(private http:HttpClient) { }

  getEntLinea(){
    return this.http.get(`${this.API_URL}/entLinea`);
  }

  getOneEntLinea(id:number | string){
    return this.http.get(`${this.API_URL}/entLinea/getone/${id}`);
  }
  getEntrada(){
    return this.http.get(`${this.API_URL}/entLinea/entradas`);
  }
  getLinea(id:number | string){
    return this.http.get(`${this.API_URL}/entLinea/linea/${id}`);
  }

  createEntLinea(entLinea: EntradaLinea){
    return this.http.post(`${this.API_URL}/entLinea`,entLinea)
  }

  updateEntLinea(id:number | string, entLinea:EntradaLinea){
    return this.http.put(`${this.API_URL}/entLinea/${id}`,entLinea);
  }

  deleteEntLinea(id:number | string){
    return this.http.delete(`${this.API_URL}/entLinea/${id}`);
  }
}
