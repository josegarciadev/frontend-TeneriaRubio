import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
 

  public API_URL= 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }

  public listMenu(){
    return this.http.get(`${this.API_URL}/menu`);
  }

  public getMenu(id:number){
    return this.http.get(`${this.API_URL}/usuarios/menu/${id}`);
  }
}
