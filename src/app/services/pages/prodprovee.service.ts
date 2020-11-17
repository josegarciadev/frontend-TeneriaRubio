import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Prodprov} from '../../Models/prodprov';

@Injectable({
  providedIn: 'root'
})
export class ProdproveeService {
  public API_URL= 'http://localhost:3000/api';
  constructor(private http:HttpClient) { }

  getProdprov(){
    return this.http.get(`${this.API_URL}/prodprov`);
  }

  getOneProdprov(id:number | string){
    return this.http.get(`${this.API_URL}/prodprov/${id}`);
  }

  createProdprov(Prodprov: Prodprov){
    return this.http.post(`${this.API_URL}/prodprov`,Prodprov)
  }

  updateProdprov(id:number | string, Prodprov:Prodprov){
    return this.http.put(`${this.API_URL}/prodprov/${id}`,Prodprov);
  }

  deleteProdprov(id:number | string){
    return this.http.delete(`${this.API_URL}/prodprov/${id}`);
  }
}
