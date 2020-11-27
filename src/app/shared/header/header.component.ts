import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  public user :any= JSON.parse(sessionStorage.getItem('user'));
  public rol : string;
  constructor() {

   }

  ngOnInit() {
    
    this.getRol();
    console.log(this.rol);
  }


  getRol(){
    if(this.user.rol==1){
      this.rol='ADMINISTRADOR ALMACEN';
    }
    if(this.user.rol==2){
      this.rol='USUARIO COMÚN';
    }
    if(this.user.rol==3){
      this.rol='SUPER USUARIO';
    }
    if(this.user.rol==4){
      this.rol='ADMINISTRADOR RECURSOS HUMANOS';
    }
  }
}
