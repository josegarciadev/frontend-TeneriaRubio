import { Component, OnInit } from '@angular/core';
import {EmpleadosService} from '../../../services/services.index';
import {SalidaempleadoService} from '../../../services/services.index';
import {SalidaEmpleado} from '../../../Models/salidaEmpleado';
import {Router,ActivatedRoute}  from '@angular/router';
import swal from 'sweetalert';
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
    descripcion:'',
    id_user:0,
    nombre_user:''
  }
  public estado :boolean=false;
  public query:any=[];
  public user:any = JSON.parse(sessionStorage.getItem('user'));

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
  swal("¿Esta seguro de crear la salida de empleados?")
  .then((value) => {
  delete this.enviar.id_salida;
  this.enviar.id_empleado= this.empleado.id_empleado;
  this.enviar.fecha_salida= this.empleado.fecha_salida;
  this.enviar.descripcion= this.empleado.descripcion;
  console.log(this.enviar);

    this.enviar.id_user = this.user.id_usuario;
    this.enviar.nombre_user= this.user.user;
    this.salidaempleadoService.createSalEmp(this.enviar)
    .subscribe(
      res=>{ 
        swal('Empleado creado con exito!');
        console.log(this.empleado);
        this.router.navigate(['/salidaEmpleado']);
      },
      err=> console.error(err)
    );
   
  });
      
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

  swal("Actualizar",'¿Esta seguro de actualizar?', 'warning')
    .then((value) => {
      this.enviar.id_salida= this.empleado.id_salida;
       this.enviar.id_empleado= this.empleado.id_empleado;
      this.enviar.fecha_salida= this.empleado.fecha_salida;
      this.enviar.descripcion= this.empleado.descripcion;
      
      this.enviar.id_user = this.user.id_usuario;
      this.enviar.nombre_user = this.user.user;
  
      this.salidaempleadoService.updateSalEmp(this.enviar.id_salida, this.enviar)
              .subscribe(
                res =>{
                swal('Perfecto','La Salida del empleado fue actualizado con exito','success');
                this.router.navigate(['/salidaEmpleado']);
                console.log(res);},
               err=> console.error(err)
    );
    });
  }
}
