import { Component, OnInit } from '@angular/core';
import {EmpleadosService} from '../../../services/services.index';
import {SalidaempleadoService} from '../../../services/services.index';
import {SalidaEmpleado} from '../../../Models/salidaEmpleado';
import {Router,ActivatedRoute}  from '@angular/router';
@Component({
  selector: 'app-agg-sal-emp',
  templateUrl: './agg-sal-emp.component.html',
  styles: []
})
export class AggSalEmpComponent implements OnInit {
  public empleado:any={
    id_salida: 0,
    id_empleado: 0,
    fecha_salida:new Date,
    descripcion:''
  }
  public enviar:SalidaEmpleado={
    id_salida: 0,
    id_empleado: 0,
    fecha_salida: new Date,
    descripcion:''
  }
  public estado :boolean=false;
  public query:any=[];
constructor(private empleadosServices: EmpleadosService,private router:Router, private salidaempleadoService:SalidaempleadoService,
  private activatedRouter:ActivatedRoute) { }

ngOnInit() {
  this.getList();
  const params=this.activatedRouter.snapshot.params.id;
  if(params){
    this.getOne(params);
    this.estado=true;
  }
}
saveSalEmp(){
  delete this.enviar.id_salida;
  this.enviar.id_empleado= this.empleado.id_empleado;
  this.enviar.fecha_salida= this.empleado.fecha_salida;
  this.enviar.descripcion= this.empleado.descripcion;
  console.log(this.enviar);
  this.salidaempleadoService.createSalEmp(this.enviar)
  .subscribe(
    res=>{
      this.router.navigate(['/salidaEmpleado']);
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
  this.salidaempleadoService.getOneSalEmp(id)
    .subscribe(
      res=>{
        this.empleado=res;
        console.log(this.empleado);
      },
      err=>console.error(err)
    );
}

updateSalEmp(){
  this.enviar.id_salida= this.empleado.id_salida;
  this.enviar.id_empleado= this.empleado.id_empleado;
  this.enviar.fecha_salida= this.empleado.fecha_salida;
  this.enviar.descripcion= this.empleado.descripcion;

  console.log(this.enviar);
  this.salidaempleadoService.updateSalEmp(this.enviar.id_salida, this.enviar)
    .subscribe(
      res =>{
        console.log(res);
        this.router.navigate(['/salidaEmpleado']);
      },
      err=> console.error(err)
    );
}

}
