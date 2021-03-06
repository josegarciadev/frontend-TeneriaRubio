import { Component, OnInit } from '@angular/core';
import {EntradaempleadosService} from '../../services/services.index';
import swal from 'sweetalert';
import * as printJS from 'print-js';
@Component({
  selector: 'app-entrada-emp',
  templateUrl: './entrada-emp.component.html',
  styles: []
})
export class EntradaEmpComponent implements OnInit {
  public query :any =[];
  public enviar:any={
    id_user:0,
    nombre_user:''
  };
  public someJSONdata:any=[];
  public date= new Date();
  public fecha ;
  public page:number=1;
  public user:any = JSON.parse(sessionStorage.getItem('user'));
  constructor(private entradaempleadosService: EntradaempleadosService) { 
    this.fecha=(this.date.getDate() + "/" + (this.date.getMonth() +1) + "/" + this.date.getFullYear());
  }

  ngOnInit() {
    this.getList();
  }

  getList(){
    this.entradaempleadosService.getEntEmp().subscribe(
      res =>{
        this.query =res;
        this.someJSONdata=res;
      },
      err=> console.error(err)
    )
  }

  deleteEmp(id:number | string){
    swal({
      title:'Eliminar',
      text: '¿Seguro de eliminar la entrada del empleado?',
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
          console.log(this.enviar);
          this.entradaempleadosService.deleteEntEmp(JSON.stringify(this.enviar))
            .subscribe(
              res=>{
                swal('Perfecto','La entrad de empleado fue borrada con exito','success');
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
      { field: 'nombre_departamento', displayName: 'Departamento'},
      { field: 'fecha_entrada', displayName: 'Fecha de Entrada'},
      { field: 'descripcion', displayName: 'Descripcion'}
        ], type: 'json',
        gridHeaderStyle: 'color: #222831;  border: 2px solid #0c3a56;padding:5px;',
        gridStyle: 'color: #222831;border: 2px solid #0c3a56; text-align: center;padding:5px;',
        font:'Arial',
        
        header: `<h1 class="custom-h1" styles="text-aling: center">Teneria Rubio <span>&nbsp;${this.fecha}</span></h1><h3 class="custom-h3" styles="text-aling: center">Entrada de Empleados</h3>`,
        style: '.custom-h3 { color: #0c3a56; text-align: center;font-size: 30px}, .custom-h1 {color:red; text-align: center ;font-size: 50px}',
      })
  }

}
