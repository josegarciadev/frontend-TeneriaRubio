import { Component, OnInit } from '@angular/core';
import {SalidalineaService} from '../../services/services.index';
import {Router} from '@angular/router';
import swal from 'sweetalert';
import * as printJS from 'print-js';
@Component({
  selector: 'app-salida-linea',
  templateUrl: './salida-linea.component.html',
  styles: []
})
export class SalidaLineaComponent implements OnInit {
  public query :any =[];
  public enviar:any={
    id_user:0,
    nombre_user:''
  };
  public someJSONdata:any=[];
  public user:any ;
  public date= new Date();
  public fecha ;
  public page:number=1;
  constructor(private salidalineaService:SalidalineaService, private router: Router) { 
    this.fecha=(this.date.getDate() + "/" + (this.date.getMonth() +1) + "/" + this.date.getFullYear());
  }

  ngOnInit() {
    this.getList();
    this.user= JSON.parse(sessionStorage.getItem('user'));
  }

  getList(){
    this.salidalineaService.getSalLinea()
      .subscribe(
        res=>{
          this.query = res;
          this.someJSONdata=res;
        },
        err=>console.error(err)
      );
  }
  deleteSalLinea(id:number | string){
    swal("Eliminar","¿Esta seguro de eliminar la salida de linea?",'warning')
      .then((value) => {
        this.enviar.id_user = this.user.id_usuario;
        this.enviar.id = id;
        this.enviar.nombre_user= this.user.user;
        this.salidalineaService.deleteSalLinea(JSON.stringify(this.enviar))
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
      { field: 'nro_orden', displayName: '# Orden'},
      { field: 'nombre_linea', displayName: 'Linea'},
      { field: 'nombre_producto', displayName: 'Producto'},
      { field: 'fecha', displayName: 'Fecha'},
      { field: 'cantidad', displayName: 'Cantidad'},
      { field: 'nombres', displayName: 'Empleado'}
        ], type: 'json',
        gridHeaderStyle: 'color: #222831;  border: 2px solid #0c3a56;padding:5px;',
        gridStyle: 'color: #222831;border: 2px solid #0c3a56; text-align: center;padding:5px;',
        font:'Arial',
        
        header: `<h1 class="custom-h1" styles="text-aling: center">Teneria Rubio <span>&nbsp;${this.fecha}</span></h1><h3 class="custom-h3" styles="text-aling: center">Salida de Linea</h3>`,
        style: '.custom-h3 { color: #0c3a56; text-align: center;font-size: 30px}, .custom-h1 {color:red; text-align: center ;font-size: 50px}',
      })
  }
}
