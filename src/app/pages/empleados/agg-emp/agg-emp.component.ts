import { Component, OnInit } from '@angular/core';
import {EmpleadosService} from '../../../services/services.index';
import {DepartamentosService} from '../../../services/services.index';
import {Empleados} from '../../../Models/empleados';
import {Router,ActivatedRoute}  from '@angular/router';
@Component({
  selector: 'app-agg-emp',
  templateUrl: './agg-emp.component.html',
  styles: []
})
export class AggEmpComponent implements OnInit {
    public empleado:Empleados={
      id_empleado: 0,
      cedula: 0,
      nombres:'',
      genero:'Seleccionar',
      fecha_nac:new Date(),
      fecha_ing:new Date(),
      direccion:'',
      telefono:'',
      id_departamento:0,
      nombre_departamento:''
    }
    public estado :boolean=false;
    public query:any=[];
  constructor(private empleadosServices: EmpleadosService,private router:Router, private departamentosServices:DepartamentosService,
    private activatedRouter:ActivatedRoute) { }

  ngOnInit() {
    this.getList();
    const params=this.activatedRouter.snapshot.params.id;
    if(params){
      this.getOne(params);
      this.estado=true;
    }
  }
  saveEmp(){
    delete this.empleado.id_empleado;
    delete this.empleado.nombre_departamento;
    delete this.empleado.descripcion_dep;
    console.log(this.empleado);
    this.empleadosServices.createEmp(this.empleado)
    .subscribe(
      res=>{
        this.router.navigate(['/empleados']);
      },
      err=> console.error(err)
    );
  }

  getList(){
    this.departamentosServices.getDep()
      .subscribe(
        res=>{
          this.query = res;
        },
        err=>console.error(err)
      );
  }

  getOne(id:number | string){
    this.empleadosServices.getOneEmp(id)
      .subscribe(
        res=>{
          this.empleado=res;
          console.log(this.empleado);
        },
        err=>console.error(err)
      );
  }

  updateEmp(){
    delete this.empleado.nombre_departamento;
    delete this.empleado.descripcion_dep;
    console.log(this.empleado);
    this.empleadosServices.updateEmp(this.empleado.id_empleado, this.empleado)
      .subscribe(
        res =>{
          console.log(res);
          this.router.navigate(['/empleados']);
        },
        err=> console.error(err)
      );
  }
}
