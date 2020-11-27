import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/services.index';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {
  public sesion= JSON.parse(sessionStorage.getItem('user'));
  constructor(private userSvc:UsuarioService) { }

  ngOnInit() {
    this.userSvc.usuario=this.sesion;
  }


}
