import { Injectable } from '@angular/core';
import { CanActivateChild,Router } from '@angular/router';
import { Observable } from 'rxjs';
import {UsuarioService} from '../services/services.index';
@Injectable({
  providedIn: 'root'
})
export class AutenticarGuard implements CanActivateChild {
  constructor(private userSvc: UsuarioService,private router: Router){

  }
  canActivateChild(){
    if(this.userSvc.log==false){
      this.router.navigate(['/login']);
      return false;
    }else{
      return true;
    }
  }
  
}
