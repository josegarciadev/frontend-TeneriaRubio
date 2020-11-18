import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SalidaLinea} from '../../Models/salidaLinea';
@Injectable({
  providedIn: 'root'
})
export class SalidalineaService {

  public API_URL= 'http://localhost:3000/api';
  constructor(private http:HttpClient) { }

  getSalLinea(){
    return this.http.get(`${this.API_URL}/salLinea`);
  }

  getOneSalLinea(id:number | string){
    return this.http.get(`${this.API_URL}/salLinea/${id}`);
  }
  getLinea(id:number | string){
    return this.http.get(`${this.API_URL}/salLinea/linea/${id}`);
  }

  createSalLinea(salLinea: SalidaLinea){
    return this.http.post(`${this.API_URL}/salLinea`,salLinea)
  }

  updateSalLinea(id:number | string, salLinea:SalidaLinea){
    return this.http.put(`${this.API_URL}/salLinea/${id}`,salLinea);
  }

  deleteSalLinea(id:number | string){
    return this.http.delete(`${this.API_URL}/salLinea/${id}`);
  }
}
