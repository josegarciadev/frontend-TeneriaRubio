import { Component, OnInit } from '@angular/core';
import {UsuarioService} from '../../services/services.index';
import swal from 'sweetalert';
import * as printJS from 'print-js';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: []
})
export class UsuarioComponent implements OnInit {
  public query :any =[];
  public date= new Date();
  public fecha ;
  constructor(private usuarioServices: UsuarioService) {
    this.fecha=(this.date.getDate() + "/" + (this.date.getMonth() +1) + "/" + this.date.getFullYear());
   }
  public enviar:any={
    id_user:0,
    nombre_user:''
  };
  public someJSONdata:any=[];


  public user:any = JSON.parse(sessionStorage.getItem('user'));
  ngOnInit() {
    this.getList();
    
  }

  getList(){
    this.usuarioServices.getUser().subscribe(
      res =>{
        this.query =res;
        this.someJSONdata=res;
        
      },
      err=> console.error(err)
    )
  }

 
  deleteUser(id:number | string){
    swal("Eliminar","¿Esta seguro de eliminar la salida de linea?",'warning')
      .then((value) => {
        this.enviar.id_user = this.user.id_usuario;
        this.enviar.id = id;
        this.enviar.nombre_user= this.user.user;
        console.log(this.enviar);
        this.usuarioServices.deleteUser(JSON.stringify(this.enviar))
          .subscribe(
            res=>{
              
              this.getList();
            },
            err=>console.error(err)
          );
        
      });
  }
  generatePDF(){

    printJS({printable: this.someJSONdata, properties: [
      { field: 'cedula', displayName: 'Cedula'},
      { field: 'nombre', displayName: 'Nombres'},
      { field: 'apellido', displayName: 'Apellidos'},
      { field: 'telefono', displayName: 'Telefono'},
      { field: 'fecha_registro', displayName: 'Fecha Reg'},
      { field: 'correo_elec', displayName: 'Email'},
      { field: 'user', displayName: 'Usuario'},
      { field: 'direccion', displayName: 'Direccion'},
      { field: 'status', displayName: 'Status'}
      
     
        ], type: 'json',
        gridHeaderStyle: 'color: #222831;  border: 2px solid #0c3a56;padding:5px;',
        gridStyle: 'color: #222831;border: 2px solid #0c3a56; text-align: center;padding:5px;',
        font:'Arial',
        
        header: `<h1 class="custom-h1" styles="text-aling: center">Teneria Rubio <span>&nbsp;${this.fecha}</span></h1><h3 class="custom-h3" styles="text-aling: center">Usuarios</h3>`,
        style: '.custom-h3 { color: #0c3a56; text-align: center;font-size: 30px}, .custom-h1 {color:red; text-align: center ;font-size: 50px}',
       
      })
  }
}
