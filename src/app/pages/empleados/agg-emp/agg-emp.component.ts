import { Component, OnInit } from '@angular/core';
import {EmpleadosService} from '../../../services/services.index';
import {DepartamentosService} from '../../../services/services.index';
import {Empleados} from '../../../Models/empleados';
import {Router,ActivatedRoute}  from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-agg-emp',
  templateUrl: './agg-emp.component.html',
  styles: []
})
export class AggEmpComponent implements OnInit {
    public date= new Date();

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
      nombre_departamento:'',
      id_user:0,
      nombre_user:''
    }
    public user:any ;
    public estado :boolean=false;
    public query:any=[];
  constructor(private empleadosServices: EmpleadosService,private router:Router, private departamentosServices:DepartamentosService,
    private activatedRouter:ActivatedRoute) {
     }

  ngOnInit() {
    this.getList();
    this.user= JSON.parse(sessionStorage.getItem('user'));
    const params=this.activatedRouter.snapshot.params.id;
    if(params){
      this.getOne(params);
      this.estado=true;
    }
  }
  saveEmp(){
    swal("¿Esta seguro de crear la entrada de linea?")
    .then((value) => {
      delete this.empleado.id_empleado;
      delete this.empleado.nombre_departamento;
      delete this.empleado.descripcion_dep;
      
      this.empleado.id_user = this.user.id_usuario;
      this.empleado.nombre_user= this.user.user;
      this.empleadosServices.createEmp(this.empleado)
      .subscribe(
        res=>{ 
          swal('Empleado creado con exito!');
          this.router.navigate(['/empleados']);
        },
        err=> console.error(err)
      );
     
    });
        
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

    swal("Actualizar",'¿Esta seguro de actualizar?', 'warning')
      .then((value) => {
        delete this.empleado.nombre_departamento;
        delete this.empleado.descripcion_dep;
        
        this.empleado.id_user = this.user.id_usuario;
        this.empleado.nombre_user = this.user.user;
    
    console.log(this.empleado);
        this.empleadosServices.updateEmp(this.empleado.id_empleado, this.empleado)
                .subscribe(
                  res =>{
                  swal('Perfecto','El empleado fue actualizado con exito','success');
                  this.router.navigate(['/empleados']);
                  console.log(res);},
                 err=> console.error(err)
      );
      });
    }
  

  
}
