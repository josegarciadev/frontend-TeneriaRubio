import { Component, OnInit } from '@angular/core';
import {LineaService} from '../../services/services.index';
import {Router} from '@angular/router';
import * as printJS from 'print-js';
@Component({
  selector: 'app-linea',
  templateUrl: './linea.component.html',
  styles: []
})
export class LineaComponent implements OnInit {
 public query :any =[];
 public someJSONdata:any=[];
 public date= new Date();
  public fecha ;
  constructor(private lineaService:LineaService, private router: Router) { 
    this.fecha=(this.date.getDate() + "/" + (this.date.getMonth() +1) + "/" + this.date.getFullYear());
  }

  ngOnInit() {
    this.getList();
  }

  getList(){
    this.lineaService.getLinea()
      .subscribe(
        res=>{
          this.query = res;
          this.someJSONdata=res;
        },
        err=>console.error(err)
      );
  }

  deleteLinea(id:number | string){
    this.lineaService.deleteLinea(id)
          .subscribe(
            res=>{
              
              this.getList();
            },
            err=>console.error(err)
          );
  }
  generatePDF(){
    
    printJS({printable: this.someJSONdata, properties: [
      { field: 'nombre_linea', displayName: 'Nombre'},
      { field: 'nombre_departamento', displayName: 'Departamento'},
      { field: 'descripcion_linea', displayName: 'Descripcion'},
        ], type: 'json',
        gridHeaderStyle: 'color: #222831;  border: 2px solid #0c3a56;padding:5px;',
        gridStyle: 'color: #222831;border: 2px solid #0c3a56; text-align: center;padding:5px;',
        font:'Arial',
        
        header: `<h1 class="custom-h1" styles="text-aling: center">Teneria Rubio <span>&nbsp;${this.fecha}</span></h1><h3 class="custom-h3" styles="text-aling: center">Linea</h3>`,
        style: '.custom-h3 { color: #0c3a56; text-align: center;font-size: 30px}, .custom-h1 {color:red; text-align: center ;font-size: 50px}',
      })
  }
}
