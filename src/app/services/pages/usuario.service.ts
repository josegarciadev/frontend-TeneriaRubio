import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Usuario} from '../../Models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public API_URL= 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }

  
  getUser(){
    return this.http.get(`${this.API_URL}/usuarios`);
  }

  getOneUser(id:number | string){
    return this.http.get(`${this.API_URL}/usuarios/${id}`);
  }

  createUser(user: Usuario){
    return this.http.post(`${this.API_URL}/usuarios`,user)
  }

  updateUser(id:number | string, user:Usuario){
    return this.http.put(`${this.API_URL}/usuarios/${id}`,user);
  }

  deleteUser(id:number | string){
    return this.http.delete(`${this.API_URL}/usuarios/${id}`);
  }
}
