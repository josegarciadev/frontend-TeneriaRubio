import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UsuarioService} from '../services/services.index';
import {Usuario} from '../Models/usuario';
import swal from 'sweetalert';
declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public usuario:Usuario ={
    user:'',
    pass:''
  }
  public resp:any={
    message:''
  }
    
  

  constructor(public route: Router,private usuarioServices: UsuarioService) { }

  ngOnInit() {
    init_plugins();
  }
  ingresar(){
    if(this.usuario.user != ''){
      if(this.usuario.pass != ''){
    this.usuarioServices.login(this.usuario).subscribe(
      res=>{
        let resp:any = res;console.log(resp);
        if(resp.message == false){
          console.log(resp);
          swal('Error','Credenciales invalidas','error');
        }else{
          
          localStorage.setItem('usuario',JSON.stringify(resp));
          this.route.navigate(['/dashboard']);
        }
      },err => console.error(err)
    );
  }else{
    swal('Error','El campo Contraseña no puede estar vacio.','warning');
  }
  }else{
    swal('Error','El campo Usuario no puede estar vacio.','warning');
  }
    
  }
}
