import { Component, OnInit } from '@angular/core';
import {ProdproveeService} from '../../../services/services.index';
import {LineaService} from '../../../services/services.index';
import {LineaProdService} from '../../../services/services.index';

import {Router,ActivatedRoute}  from '@angular/router';
@Component({
  selector: 'app-agg-linea-prod',
  templateUrl: './agg-linea-prod.component.html',
  styles: []
})
export class AggLineaProdComponent implements OnInit {
  public lineaprod:any={
    id_lineaprod:0,
    id_linea:0,
    id_prodpro:0,
    existencia: 0,
    
    
  }
  public query1:any=[];
  public query2:any=[];
  public estado: boolean=false;
  constructor(private lineaprodService: LineaProdService,private lineaService: LineaService, private router:Router,
    private activatedRouter: ActivatedRoute,private prodprovServices: ProdproveeService) { }

  ngOnInit() {
    this.getListLinea();
    this.getListProdprov();
    const params=this.activatedRouter.snapshot.params.id;
    if(params){
      this.getOne(params);
      this.estado=true;
    }
    
  }
  getListLinea(){
    this.lineaService.getLinea()
      .subscribe(
        res=>{
          this.query1 = res;
        },
        err=>console.error(err)
      );
  }
  getListProdprov(){
    this.prodprovServices.getProdprov()
      .subscribe(
        res=>{
          this.query2 = res;
        },
        err=>console.error(err)
      );
  }

  saveLineaprod(){
    delete this.lineaprod.id_lineaprod;
    delete this.lineaprod.id_producto;
    delete this.lineaprod.id_proveedor;
    delete this.lineaprod.codigo_producto;
    delete this.lineaprod.nombre_producto;
    delete this.lineaprod.unidad_medida;
    delete this.lineaprod.nombre_proveedor;
    delete this.lineaprod.descripcion_prov;
    delete this.lineaprod.nombre_linea;
    delete this.lineaprod.id_departamento;
    delete this.lineaprod.nombre_departamento;
    delete this.lineaprod.descripcion_dep;
    delete this.lineaprod.descripcion_linea;

    this.lineaprodService.createLineaProd(this.lineaprod)
    .subscribe(
      res=>{
        this.router.navigate(['/lineaProd']);
      },
      err=> console.error(err)
    );
    
  }

  getOne(id:number | string){
    this.lineaprodService.getOneLineaProd(id)
      .subscribe(
        res=>{
          this.lineaprod=res;

        },
        err=>console.error(err)
      );
  }

  updateLineaprod(){
    delete this.lineaprod.id_producto;
    delete this.lineaprod.id_proveedor;
    delete this.lineaprod.codigo_producto;
    delete this.lineaprod.nombre_producto;
    delete this.lineaprod.unidad_medida;
    delete this.lineaprod.nombre_proveedor;
    delete this.lineaprod.descripcion_prov;
    delete this.lineaprod.nombre_linea;
    delete this.lineaprod.id_departamento;
    delete this.lineaprod.nombre_departamento;
    delete this.lineaprod.descripcion_dep;
    delete this.lineaprod.descripcion_linea;
    
  
    this.lineaprodService.updateLineaProd(this.lineaprod.id_lineaprod, this.lineaprod)
      .subscribe(
        res =>{
          this.router.navigate(['/lineaProd']);
        },
        err=> console.error(err)
      );
  }
}
