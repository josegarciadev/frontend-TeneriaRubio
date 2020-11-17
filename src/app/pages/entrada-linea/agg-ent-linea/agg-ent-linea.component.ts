import { Component, OnInit } from '@angular/core';
import {EntradalineaService} from '../../../services/services.index';
import {EmpleadosService} from '../../../services/services.index';
import {LineaService} from '../../../services/services.index';
import {Router,ActivatedRoute}  from '@angular/router';
@Component({
  selector: 'app-agg-ent-linea',
  templateUrl: './agg-ent-linea.component.html',
  styles: []
})
export class AggEntLineaComponent implements OnInit {
  public entradaLinea:any={
    nro_orden:'',
    id_linea:0,
    id_lineaprod:0,
    fecha:new Date,
    cantidad:0,
    id_empleado:0
  }
  public estado :boolean=false;
  public query1:any=[];
  public query2:any =[];
  public query3:any =[];
constructor(private entradalineaService: EntradalineaService,private empleadosService:EmpleadosService,private lineaService:LineaService,private router:Router,
  private activatedRouter:ActivatedRoute) { }

ngOnInit() {
  this.getListLinea();
  this.getListEmpleado();

  
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
getListEmpleado(){
  this.empleadosService.getEmp()
    .subscribe(
      res=>{
        this.query3 = res;
      },
      err=>console.error(err)
    );
}
getListProdprov(id:any){
  
  this.entradalineaService.getLinea(id)
    .subscribe(
      res=>{
        this.query2 = res;
      },
      err=>console.error(err)
    );
}

saveEntLinea(){
  delete this.entradaLinea.id_producto;
  delete this.entradaLinea.id_proveedor;
  delete this.entradaLinea.codigo_producto;
  delete this.entradaLinea.nombre_producto;
  delete this.entradaLinea.unidad_medida;
  delete this.entradaLinea.nombre_proveedor;
  delete this.entradaLinea.descripcion_prov;
  
  this.entradalineaService.createEntLinea(this.entradaLinea)
  .subscribe(
    res=>{
      this.router.navigate(['/entradaLinea']);
    },
    err=> console.error(err)
  );
}



getOne(id:number | string){
  this.entradalineaService.getOneEntLinea(id)
    .subscribe(
      res=>{
        this.entradaLinea=res;
        let id = this.entradaLinea.id_linea;
         this.getListProdprov(id);
        console.log(this.entradaLinea);
      },
      err=>console.error(err)
    );
}

updateEntLinea(){
  delete this.entradaLinea.id_producto;
  delete this.entradaLinea.id_proveedor;
  delete this.entradaLinea.codigo_producto;
  delete this.entradaLinea.nombre_producto;
  delete this.entradaLinea.unidad_medida;
  delete this.entradaLinea.nombre_proveedor;
  delete this.entradaLinea.descripcion_prov;
  
  
  console.log(this.entradaLinea);
  this.entradalineaService.updateEntLinea(this.entradaLinea.nro_orden, this.entradaLinea)
    .subscribe(
      res =>{
        console.log(res);
        this.router.navigate(['/entradaLinea']);
      },
      err=> console.error(err)
    );
}
}
