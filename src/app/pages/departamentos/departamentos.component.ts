import { Component, OnInit } from '@angular/core';
import {DepartamentosService} from '../../services/services.index';
import {Router} from '@angular/router';

import swal from 'sweetalert';
import * as printJS from 'print-js';



@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styles: []
})
export class DepartamentosComponent implements OnInit {
  public query :any =[];
  public someJSONdata:any=[];
  public date= new Date();
  public fecha ;
  public page:number=1;
  constructor(private departamentosServices: DepartamentosService, private router: Router) { 
    this.fecha=(this.date.getDate() + "/" + (this.date.getMonth() +1) + "/" + this.date.getFullYear());
  }

  ngOnInit() {
    this.getList();
  }

  getList(){
    this.departamentosServices.getDep()
      .subscribe(
        res=>{
          this.query = res;
          this.someJSONdata=res;
        
        },
        err=>console.error(err)
      );
  }

  deleteDep(id:number | string){
    swal({
      title:'Eliminar',
      text: '¿Seguro de Eliminar el departamento?',
      icon:'warning',
      closeOnClickOutside: false,
      closeOnEsc: false,
      buttons: {
        cancelar: {text:'Cancelar',className:'sweet-warning'},
        confirmar: {text:'Confirmar',className:'sweet-success'},
      },
    }).then((value) => {
      if(value==='confirmar'){
        this.departamentosServices.deleteDep(id)
        .subscribe(
          res=>{
            console.log(res);
            swal('El departamento fue eliminado con exito!');
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
      { field: 'id_departamento', displayName: 'ID'},
      { field: 'nombre_departamento', displayName: 'Nombre'},
      { field: 'descripcion_dep', displayName: 'Descripción'}
        ], type: 'json',
        gridHeaderStyle: 'color: #222831;  border: 2px solid #0c3a56;padding:5px;',
        gridStyle: 'color: #222831;border: 2px solid #0c3a56; text-align: center;padding:5px;',
        font:'Arial',
        
        header: `<h1 class="custom-h1" styles="text-aling: center">Teneria Rubio <span>&nbsp;${this.fecha}</span></h1><h3 class="custom-h3" styles="text-aling: center">Departamentos</h3>`,
        style: '.custom-h3 { color: #0c3a56; text-align: center;font-size: 30px}, .custom-h1 {color:red; text-align: center ;font-size: 50px}',
      })
  
  }
}
