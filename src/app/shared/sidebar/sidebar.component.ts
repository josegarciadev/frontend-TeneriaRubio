import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/services.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  public query :any = [];
  public menus :any = [];
  public user :any= JSON.parse(localStorage.getItem('usuario'));
  
  constructor(public sidebarService: SidebarService) { }
  
  ngOnInit() {
    
    this.getMenu(this.user.rol);
    
  }


  getMenu(id){
    this.sidebarService.getMenu(id).subscribe(
      res=>{
        this.menus = res;
        
        for(let i=0; i < this.menus.length; i++){
          this.menus[i].submenu= JSON.parse(this.menus[i].submenu);
         
        }
  
      },
      err => console.error(err)
    );
  }
  cerrar(){
    localStorage.removeItem('usuario');
  
  }

}
