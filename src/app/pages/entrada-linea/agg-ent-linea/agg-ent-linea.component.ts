import { Component, OnInit } from '@angular/core';
import {EntradalineaService} from '../../../services/services.index';
import {EmpleadosService} from '../../../services/services.index';
import {LineaService} from '../../../services/services.index';
import {EntradaLinea} from '../../../Models/entradaLinea';
import {Router,ActivatedRoute}  from '@angular/router';
import swal from 'sweetalert';
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
  };
  public enviar:EntradaLinea={
    nro_orden:'',
    id_linea:0,
    id_lineaprod:0,
    fecha:new Date,
    cantidad:0,
    id_empleado:0,
    id_user:0,
    nombre_user:''
  };
  public estado :boolean=false;
  public query1:any=[];
  public query2:any =[];
  public query3:any =[];
  public orden: string | number;
  public user:any ;
constructor(private entradalineaService: EntradalineaService,private empleadosService:EmpleadosService,private lineaService:LineaService,private router:Router,
  private activatedRouter:ActivatedRoute) { }

ngOnInit() {
  this.getListLinea();
  this.getListEmpleado();
  this.user= JSON.parse(sessionStorage.getItem('user'));
  
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
  swal("¿Esta seguro de crear la entrada de linea?")
  .then((value) => {
    this.enviar.nro_orden= this.entradaLinea.nro_orden;
    this.enviar.id_linea= this.entradaLinea.id_linea;
    this.enviar.id_lineaprod= this.entradaLinea.id_lineaprod;
    this.enviar.fecha= this.entradaLinea.fecha;
    this.enviar.cantidad= this.entradaLinea.cantidad;
    this.enviar.id_empleado= this.entradaLinea.id_empleado;

    this.enviar.id_user = this.user.id_usuario;
    this.enviar.nombre_user= this.user.user;
    this.entradalineaService.createEntLinea(this.enviar)
    .subscribe(
      res=>{ 
        swal('Entrada de linea creado con exito!');
        console.log(this.enviar);
        this.router.navigate(['/entradaLinea']);
      },
      err=> console.error(err)
    );
   
  });
      
}


getOne(id:number | string){
  this.entradalineaService.getOneEntLinea(id)
    .subscribe(
      res=>{
        this.entradaLinea=res;
        this.orden= this.entradaLinea.nro_orden;
        let id = this.entradaLinea.id_linea;
         this.getListProdprov(id);
        
      },
      err=>console.error(err)
    );
}

updateEntLinea(){

  swal("Actualizar",'¿Esta seguro de actualizar?', 'warning')
    .then((value) => {
      this.enviar.nro_orden= this.entradaLinea.nro_orden;
      this.enviar.id_linea= this.entradaLinea.id_linea;
      this.enviar.id_lineaprod= this.entradaLinea.id_lineaprod;
      this.enviar.fecha= this.entradaLinea.fecha;
      this.enviar.cantidad= this.entradaLinea.cantidad;
      this.enviar.id_empleado= this.entradaLinea.id_empleado;
      this.enviar.id_user = this.user.id_usuario;
      this.enviar.nombre_user = this.user.user;
  
  console.log(this.enviar);
      this.entradalineaService.updateEntLinea(this.orden, this.enviar)
              .subscribe(
                res =>{
                swal('Perfecto','La entrada de linea fue actualizado con exito','success');
                this.router.navigate(['/entradaLinea']);
                console.log(res);},
               err=> console.error(err)
    );
    });
  }

}
