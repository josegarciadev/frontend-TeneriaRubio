import { Component, OnInit } from '@angular/core';
import {ProdproveeService} from '../../services/services.index';
import {Router} from '@angular/router';
import * as printJS from 'print-js';
@Component({
  selector: 'app-prodprov',
  templateUrl: './prodprov.component.html',
  styles: []
})
export class ProdprovComponent implements OnInit {
  public query :any =[];
  public someJSONdata:any=[];
  public date= new Date();
  public fecha ;
  constructor(private prodprovServices: ProdproveeService, private router: Router) { 
    this.fecha=(this.date.getDate() + "/" + (this.date.getMonth() +1) + "/" + this.date.getFullYear());
  }

  ngOnInit() {
    this.getList();
  }

  getList(){
    this.prodprovServices.getProdprov()
      .subscribe(
        res=>{
          this.query = res;
          this.someJSONdata=res;
        },
        err=>console.error(err)
      );
  }

  deleteProdprov(id:number | string){
    this.prodprovServices.deleteProdprov(id)
          .subscribe(
            res=>{
              
              this.getList();
            },
            err=>console.error(err)
          );
  }
  generatePDF(){
    console.log(this.someJSONdata);
    printJS({printable: this.someJSONdata, properties: [
      { field: 'codigo_producto', displayName: 'Codigo'},
      { field: 'nombre_producto', displayName: 'Nombre'},
      { field: 'unidad_medida', displayName: 'Unidad de Medida'},
      { field: 'nombre_proveedor', displayName: 'Unidad de Medida'}
        ], type: 'json',
        gridHeaderStyle: 'color: #222831;  border: 2px solid #0c3a56;padding:5px;',
        gridStyle: 'color: #222831;border: 2px solid #0c3a56; text-align: center;padding:5px;',
        font:'Arial',
        
        header: `<h1 class="custom-h1" styles="text-aling: center">Teneria Rubio <span>&nbsp;${this.fecha}</span></h1><h3 class="custom-h3" styles="text-aling: center">Producto Proveedor</h3>`,
        style: '.custom-h3 { color: #0c3a56; text-align: center;font-size: 30px}, .custom-h1 {color:red; text-align: center ;font-size: 50px}',
      })
  }
}
