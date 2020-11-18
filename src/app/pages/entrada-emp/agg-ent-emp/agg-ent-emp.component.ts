import { Component, OnInit } from '@angular/core';
import {EmpleadosService} from '../../../services/services.index';
import {EntradaempleadosService} from '../../../services/services.index';
import {EntradaEmpleado} from '../../../Models/entradaEmpleado';
import {Router,ActivatedRoute}  from '@angular/router';
@Component({
  selector: 'app-agg-ent-emp',
  templateUrl: './agg-ent-emp.component.html',
  styles: []
})
export class AggEntEmpComponent implements OnInit {
  public empleado:any={
    id_entrada: 0,
    id_empleado: 0,
    fecha_entrada:new Date,
    descripcion:''
  }
  public enviar:EntradaEmpleado={
    id_entrada: 0,
    id_empleado: 0,
    fecha_entrada: new Date,
    descripcion:''
  }
  public estado :boolean=false;
  public query:any=[];
constructor(private empleadosServices: EmpleadosService,private router:Router, private entradaempleadosService:EntradaempleadosService,
  private activatedRouter:ActivatedRoute) { }

ngOnInit() {
  this.getList();
  const params=this.activatedRouter.snapshot.params.id;
  if(params){
    this.getOne(params);
    this.estado=true;
  }
}
saveEntEmp(){
  delete this.enviar.id_entrada;
  this.enviar.id_empleado= this.empleado.id_empleado;
  this.enviar.fecha_entrada= this.empleado.fecha_entrada;
  this.enviar.descripcion= this.empleado.descripcion;
  console.log(this.enviar);
  this.entradaempleadosService.createEntEmp(this.enviar)
  .subscribe(
    res=>{
      this.router.navigate(['/entradaEmpleado']);
    },
    err=> console.error(err)
  );
}

getList(){
  this.empleadosServices.getEmp()
    .subscribe(
      res=>{
        this.query = res;
      },
      err=>console.error(err)
    );
}

getOne(id:number | string){
  this.entradaempleadosService.getOneEntEmp(id)
    .subscribe(
      res=>{
        this.empleado=res;
        console.log(this.empleado);
      },
      err=>console.error(err)
    );
}

updateEntEmp(){
  this.enviar.id_entrada= this.empleado.id_entrada;
  this.enviar.id_empleado= this.empleado.id_empleado;
  this.enviar.fecha_entrada= this.empleado.fecha_entrada;
  this.enviar.descripcion= this.empleado.descripcion;

  console.log(this.enviar);
  this.entradaempleadosService.updateEntEmp(this.enviar.id_entrada, this.enviar)
    .subscribe(
      res =>{
        console.log(res);
        this.router.navigate(['/entradaEmpleado']);
      },
      err=> console.error(err)
    );
}

}
