import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/services.index';
import { UsuarioService } from '../../services/services.index';
declare function init_plugins();
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  public query :any = [];
  public menus :any = [];
  public user :any= JSON.parse(sessionStorage.getItem('user'));
  public rol : string;
  constructor(public sidebarService: SidebarService,private userSvc:UsuarioService) { }
  
  ngOnInit() {
    init_plugins();
    this.getMenu(this.user.rol);
    this.getRol();
    if(this.user != null){
      this.userSvc.log=true;
    }
  }

 
  getMenu(id){
    this.sidebarService.getMenu(id).subscribe(
      res=>{
        var resp:any=res;
        
        
        for(let i=0; i < resp.length; i++){
          resp[i].submenu= JSON.parse(resp[i].submenu);
         
        }
       
        if(this.user.rol==4){
          delete resp[2].submenu[2];
          delete resp[2].submenu[3];
          resp[2].submenu.length=2;
          delete resp[3].submenu[2];
          delete resp[3].submenu[3];
          resp[3].submenu.length=2;
         this.menus = res;
        
        }
        if(this.user.rol==1){
          resp[2].submenu[0]=resp[2].submenu[2];
          resp[2].submenu[1]=resp[2].submenu[3];
          delete resp[2].submenu[2];
          delete resp[2].submenu[3];
          resp[2].submenu.length=2;
          resp[3].submenu[0]=resp[3].submenu[2];
          resp[3].submenu[1]=resp[3].submenu[3];
          delete resp[3].submenu[2];
          delete resp[3].submenu[3];
          resp[3].submenu.length=2;
         this.menus = res;
   
        }
        if(this.user.rol==3){
         this.menus = res;
         
        }
        if(this.user.rol==2){
          resp[1].submenu[0]=resp[1].submenu[1];
          resp[1].submenu[1]=resp[1].submenu[3];
          delete resp[1].submenu[2];
          delete resp[1].submenu[3];
          resp[1].submenu.length=2;
          resp[2].submenu[0]=resp[2].submenu[1];
          resp[2].submenu[1]=resp[2].submenu[3];
          delete resp[2].submenu[2];
          delete resp[2].submenu[3];
          resp[2].submenu.length=2;
        
          this.menus = res;
          console.log(this.menus);
         }
        
      },
      err => console.error(err)
    );
  }
  cerrar(){

    var data={
      id_usuario: this.user.id_usuario,
      nombre: this.user.nombre+' '+this.user.apellido,
      accion:'Cerro sesión'
    }

    this.userSvc.Logout(JSON.stringify(data));
 
    
  
  }


  getRol(){
    if(this.user.rol==1){
      this.rol='ADMIN Almacen';
    }
    if(this.user.rol==2){
      this.rol='Moderador';
    }
    if(this.user.rol==3){
      this.rol='Super Usuario';
    }
    if(this.user.rol==4){
      this.rol='Admin Recursos H';
    }
  }

}
