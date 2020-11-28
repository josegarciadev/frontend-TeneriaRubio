import { Component, OnInit } from '@angular/core';
import {ProveedorService} from '../../services/services.index';
import {Router} from '@angular/router';
import * as printJS from 'print-js';
import swal from 'sweetalert';
@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styles: []
})
export class ProveedorComponent implements OnInit {
  public query :any =[];
  public someJSONdata:any=[];
  public date= new Date();
  public fecha ;
  public page: number=1;
  constructor(private proveedorServices: ProveedorService, private router: Router) { 
    this.fecha=(this.date.getDate() + "/" + (this.date.getMonth() +1) + "/" + this.date.getFullYear());
  }

  ngOnInit() {
    this.getList();
  }
  getList(){
    this.proveedorServices.getProv()
      .subscribe(
        res=>{
          this.query = res;
          this.someJSONdata=res;
        },
        err=>console.error(err)
      );
  }

  deleteProv(id:number | string){
    swal({
      title:'Eliminar',
      text: '¿Seguro de eliminar el proveedor?',
      icon:'warning',
      closeOnClickOutside: false,
      closeOnEsc: false,
      buttons: {
        cancelar: {text:'Cancelar',className:'sweet-warning'},
        confirmar: {text:'Confirmar',className:'sweet-success'},
      },
    })
      .then((value) => {
        if(value==='confirmar'){
          this.proveedorServices.deleteProv(id)
          .subscribe(
            res=>{
              swal('Perfecto','El proveedor fue eliminado con exito','success');
              this.getList();
            },
            err=>console.error(err)
          );
        }
        if(value==='cancelar'){
          swal.close();
        }
        
      });

    
  }
  generatePDF(){

    printJS({printable: this.someJSONdata, properties: [
      
      { field: 'nombre_proveedor', displayName: 'Nombre'},
      { field: 'descripcion_prov', displayName: 'Descripcion'}
     
        ], type: 'json',
        gridHeaderStyle: 'color: #222831;  border: 2px solid #0c3a56;padding:5px;',
        gridStyle: 'color: #222831;border: 2px solid #0c3a56; text-align: center;padding:5px;',
        font:'Arial',
        
        header: `<h1 class="custom-h1" styles="text-aling: center">Teneria Rubio <span>&nbsp;${this.fecha}</span></h1><h3 class="custom-h3" styles="text-aling: center">Proveedor</h3>`,
        style: '.custom-h3 { color: #0c3a56; text-align: center;font-size: 30px}, .custom-h1 {color:red; text-align: center ;font-size: 50px}',
      })
  }
}
