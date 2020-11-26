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
    if(sessionStorage.getItem('user')){
      this.usuarioServices.log=true;
      this.route.navigate(['/dashboard']);
    }else{
      this.usuarioServices.log=false;
    }
    
  }
  ingresar(){
    if(this.usuario.user != ''){
      if(this.usuario.pass != ''){
    this.usuarioServices.login(this.usuario);
  }else{
    swal('Error','El campo Contraseña no puede estar vacio.','warning');
  }
  }else{
    swal('Error','El campo Usuario no puede estar vacio.','warning');
  }
    
  }
}
