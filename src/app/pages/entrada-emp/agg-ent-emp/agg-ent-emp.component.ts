import { Component, OnInit } from '@angular/core';
import {EmpleadosService} from '../../../services/services.index';
import {EntradaempleadosService} from '../../../services/services.index';
import {EntradaEmpleado} from '../../../Models/entradaEmpleado';
import {Router,ActivatedRoute}  from '@angular/router';
import swal from 'sweetalert';
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
    descripcion:'',
    id_user:0,
    nombre_user:''
  }
  public estado :boolean=false;
  public query:any=[];
  public user:any = JSON.parse(sessionStorage.getItem('user'));
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
  swal("¿Esta seguro de crear la entrada de empleados?")
  .then((value) => {
  delete this.enviar.id_entrada;
  this.enviar.id_empleado= this.empleado.id_empleado;
  this.enviar.fecha_entrada= this.empleado.fecha_entrada;
  this.enviar.descripcion= this.empleado.descripcion;
  console.log(this.enviar);

    this.enviar.id_user = this.user.id_usuario;
    this.enviar.nombre_user= this.user.user;
    this.entradaempleadosService.createEntEmp(this.enviar)
    .subscribe(
      res=>{ 
        swal('Empleado creado con exito!');
        console.log(this.empleado);
        this.router.navigate(['/entradaEmpleado']);
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

  swal("Actualizar",'¿Esta seguro de actualizar?', 'warning')
    .then((value) => {
      this.enviar.id_entrada= this.empleado.id_entrada;
       this.enviar.id_empleado= this.empleado.id_empleado;
      this.enviar.fecha_entrada= this.empleado.fecha_entrada;
      this.enviar.descripcion= this.empleado.descripcion;
      
      this.enviar.id_user = this.user.id_usuario;
      this.enviar.nombre_user = this.user.user;
  
  console.log(this.empleado);
      this.entradaempleadosService.updateEntEmp(this.enviar.id_entrada, this.enviar)
              .subscribe(
                res =>{
                swal('Perfecto','La Entrada del empleado fue actualizado con exito','success');
                this.router.navigate(['/entradaEmpleado']);
                console.log(res);},
               err=> console.error(err)
    );
    });
  }

}
