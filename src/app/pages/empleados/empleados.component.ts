import { Component, OnInit } from '@angular/core';
import {EmpleadosService} from '../../services/services.index';
import {Empleados} from '../../Models/empleados';
import swal from 'sweetalert';
import * as printJS from 'print-js';
import * as moment from 'moment';
@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styles: []
})
export class EmpleadosComponent implements OnInit {
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
  public query :any =[];
  public enviar:any={
    id_user:0,
    nombre_user:''
  };
  public someJSONdata:any=[];
  public date= new Date();
  public fecha ;
  public page:number=1;
  public hora= moment(new Date()).format("YYYY-MM-DD HH:mm:ss"); 
  public user:any = JSON.parse(sessionStorage.getItem('user'));
  constructor(private empleadosServices: EmpleadosService) {
    this.fecha=(this.date.getDate() + "/" + (this.date.getMonth() +1) + "/" + this.date.getFullYear());
    
   }

  ngOnInit() {
    this.getList();
    
  }

  getList(){
    this.empleadosServices.getEmp().subscribe(
      res =>{
        this.query =res;
        this.someJSONdata=res;
      },
      err=> console.error(err)
    )
  }

  getOne(id:number | string){

    this.empleadosServices.getOneEmp(id)
      .subscribe(
        res=>{
          this.empleado=res;
          swal({
            title:`Sobre Mi `,
            text:`
            Cedula: ${this.empleado.cedula}\n
            Nombres: ${this.empleado.nombres}\n
            Genero: ${this.empleado.genero}\n
            Fecha de nacimiento: ${this.empleado.fecha_nac}\n
            Fecha de ingreso: ${this.empleado.fecha_ing}\n
            Dirección: ${this.empleado.direccion}\n
            Telefono: ${this.empleado.telefono}\n
            Departamento: ${this.empleado.nombre_departamento}\n
            `,
            icon:'info',
            
          });
          
          console.log(this.empleado);
        },
        err=>console.error(err)
      );


  }


  deleteEmp(id:number | string){
    swal({
      title:'Eliminar',
      text: '¿Seguro de eliminar el empleado?',
      icon:'warning',
      closeOnClickOutside: false,
      closeOnEsc: false,
      buttons: {
        cancelar: {text:'Cancelar',className:'sweet-warning'},
        confirmar: {text:'Confirmar',className:'sweet-success'},
      },
    })
      .then((value) => {
        if(value==='confirmar'){
          this.enviar.id_user = this.user.id_usuario;
          this.enviar.id = id;
          this.enviar.nombre_user= this.user.user;
          this.empleadosServices.deleteEmp(JSON.stringify(this.enviar))
            .subscribe(
              res=>{
                swal('Perfecto','El empleado fue eliminado con exito','success');
                this.getList();
              },
              err=>console.error(err)
            );
        }
        if(value==='cancelar'){
          swal.close();
        }
        
        
      });
    
  }

  generatePDF(){
    console.log(this.someJSONdata);
    printJS({printable: this.someJSONdata, properties: [
      { field: 'cedula', displayName: 'Cedula'},
      { field: 'nombres', displayName: 'Nombre'},
      { field: 'genero', displayName: 'Genero'},
      { field: 'fecha_nac', displayName: 'Fecha Nac'},
      { field: 'fecha_ing', displayName: 'Ingreso'},
      { field: 'direccion', displayName: 'Direccion'},
      { field: 'telefono', displayName: 'Telefono'},
      { field: 'nombre_departamento', displayName: 'Dep Trabajo'},
        ], type: 'json',
        gridHeaderStyle: 'color: #222831;  border: 2px solid #0c3a56;padding:5px;',
        gridStyle: 'color: #222831;border: 2px solid #0c3a56; text-align: center;padding:5px;',
        font:'Arial',
        
        header: `<h1 class="custom-h1" styles="text-aling: center">Teneria Rubio <span>&nbsp;${this.fecha}</span></h1><h3 class="custom-h3" styles="text-aling: center">Empleados</h3>`,
        style: '.custom-h3 { color: #0c3a56; text-align: center;font-size: 30px}, .custom-h1 {color:red; text-align: center ;font-size: 50px}',
      })
  }
  
}
