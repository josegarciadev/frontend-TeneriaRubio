import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { Observable } from 'rxjs';
import {UsuarioService} from '../services/services.index';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class AdminalRolGuard implements CanActivate {
  constructor(private userSvc: UsuarioService,private router: Router){

  }
    canActivate(){
      if(this.userSvc.usuario.rol===1 || this.userSvc.usuario.rol===3){
        return true
      }else{
        this.router.navigate(['/login']);
        swal('Error','Su nivel de acceso no es valido','error');
        return false;
      }
    }
  }
  

