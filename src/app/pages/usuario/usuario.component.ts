import { Component, OnInit } from '@angular/core';
import {UsuarioService} from '../../services/services.index';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: []
})
export class UsuarioComponent implements OnInit {
  public query :any =[];
  constructor(private usuarioServices: UsuarioService) { }

  ngOnInit() {
    this.getList();
  }

  getList(){
    this.usuarioServices.getUser().subscribe(
      res =>{
        this.query =res;
        
      },
      err=> console.error(err)
    )
  }

  deleteEmp(id:number | string){
    this.usuarioServices.deleteUser(id)
          .subscribe(
            res=>{
              console.log(res);
              this.getList();
            },
            err=>console.error(err)
          );
  }

}
