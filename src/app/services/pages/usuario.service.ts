import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Usuario} from '../../Models/usuario';
import { Router} from '@angular/router';
import swal from 'sweetalert';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public API_URL= 'http://localhost:3000/api';
  public log =false;
  public usuario:Usuario;
  constructor(private http: HttpClient,private router:Router) { }
 
  
  getUser(){
    return this.http.get(`${this.API_URL}/usuarios`);
  }
  login(user:Usuario){
    return this.http.post(`${this.API_URL}/usuarios/login/`,user).subscribe(
      res=>{
        const resp:any = res;
        if(resp.message == false){
          console.log(resp);
          swal('Error','Credenciales invalidas','error');
        }else{
          
          if(resp.status== 'A' || resp.status== 'a'){
            sessionStorage.setItem('user',JSON.stringify(resp));
            this.log=true;
            this.router.navigate(['/dashboard']);
            this.usuario=resp;
          }else{
            swal('Error','Usuario Inactivo','error');
          }
         
        }
      },err => console.error(err)
    );
  }

  public Logout(id:number | string){
    return this.http.get(`${this.API_URL}/usuarios/logout/${id}`).subscribe(
      res=>{
        var resp:any=res;
        if(resp.message=true){
          sessionStorage.removeItem('user');
          this.log=false;
          swal('Excelente','Gracias por usar nuestro servicio.','success');
        }
        
      },
      err => console.error(err)
    );
  }
  getrol(){
    return this.http.get(`${this.API_URL}/usuarios/rol`);
  }

  getOneUser(id:number | string){
    return this.http.get(`${this.API_URL}/usuarios/getone/${id}`);
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
