import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LineaProd} from '../../Models/lineaprod';
@Injectable({
  providedIn: 'root'
})
export class LineaProdService {
  public API_URL= 'http://localhost:3000/api';
  constructor(private http:HttpClient) { }

  getLineaProd(){
    return this.http.get(`${this.API_URL}/lineaprod`);
  }

  getOneLineaProd(id:number | string){
    return this.http.get(`${this.API_URL}/lineaprod/${id}`);
  }

  createLineaProd(lineaprod: LineaProd){
    return this.http.post(`${this.API_URL}/lineaprod`,lineaprod)
  }

  updateLineaProd(id:number | string, lineaprod:LineaProd){
    return this.http.put(`${this.API_URL}/lineaprod/${id}`,lineaprod);
  }

  deleteLineaProd(id:number | string){
    return this.http.delete(`${this.API_URL}/lineaprod/${id}`);
  }
}