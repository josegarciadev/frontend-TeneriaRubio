import { Component, OnInit } from '@angular/core';
import {SalidalineaService} from '../../../services/services.index';
import {EmpleadosService} from '../../../services/services.index';
import {LineaService} from '../../../services/services.index';
import {SalidaLinea} from '../../../Models/salidaLinea';
import {Router,ActivatedRoute}  from '@angular/router';
import swal from 'sweetalert';
@Component({
  selector: 'app-agg-sal-linea',
  templateUrl: './agg-sal-linea.component.html',
  styles: []
})
export class AggSalLineaComponent implements OnInit {
  public salida:any={
    nro_orden:'',
    id_linea:0,
    id_lineaprod:0,
    fecha:new Date,
    cantidad:0,
    id_empleado:0
  };
  public enviar:SalidaLinea={
    nro_orden:'',
    id_linea:0,
    id_lineaprod:0,
    fecha:new Date,
    cantidad:0,
    id_empleado:0,
    id_user:0,
    nombre_user:''
  };
  public orden :number | string;
  public estado :boolean=false;
  public query1:any=[];
  public query2:any =[];
  public query3:any =[];
  public user:any = JSON.parse(sessionStorage.getItem('user'));
constructor(private salidalineaService: SalidalineaService,private empleadosService:EmpleadosService,private lineaService:LineaService,private router:Router,
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
  
  this.salidalineaService.getLinea(id)
    .subscribe(
      res=>{
        this.query2 = res;
      },
      err=>console.error(err)
    );
}
saveSalLinea(){
  swal("¿Esta seguro de crear la entrada de linea?")
  .then((value) => {
    this.enviar.nro_orden= this.salida.nro_orden;
    this.enviar.id_linea= this.salida.id_linea;
    this.enviar.id_lineaprod= this.salida.id_lineaprod;
    this.enviar.fecha= this.salida.fecha;
    this.enviar.cantidad= this.salida.cantidad;
    this.enviar.id_empleado= this.salida.id_empleado;

    this.enviar.id_user = this.user.id_usuario;
    this.enviar.nombre_user= this.user.user;
    this.salidalineaService.createSalLinea(this.enviar)
    .subscribe(
      res=>{ 
        let resp:any= res;
        console.log(resp);
        if(resp.message==false){
          swal('Atención!','La cantidad no es valida','warning');
        }else{
          swal('Correcto','Salida de linea creado con exito!','success');
          this.router.navigate(['/salidaLinea']);
        }
       
      },
      err=> console.error(err)
    );
   
  });
      
}


getOne(id:number | string){
  this.salidalineaService.getOneSalLinea(id)
    .subscribe(
      res=>{
        this.salida=res;
        this.orden= this.salida.nro_orden;
        let id = this.salida.id_linea;
         this.getListProdprov(id);
         
      },
      err=>console.error(err)
    );
}
updateSalLinea(){

  swal("Actualizar",'¿Esta seguro de actualizar?', 'warning')
    .then((value) => {
      this.enviar.nro_orden= this.salida.nro_orden;
      this.enviar.id_linea= this.salida.id_linea;
      this.enviar.id_lineaprod= this.salida.id_lineaprod;
      this.enviar.fecha= this.salida.fecha;
      this.enviar.cantidad= this.salida.cantidad;
      this.enviar.id_empleado= this.salida.id_empleado;
     
      this.enviar.id_user = this.user.id_usuario;
      this.enviar.nombre_user = this.user.user;
    
      this.salidalineaService.updateSalLinea(this.orden, this.enviar)
              .subscribe(
                res =>{
                swal('Perfecto','La Salida de linea fue actualizado con exito','success');
                this.router.navigate(['/salidaLinea']);
                console.log(res);},
               err=> console.error(err)
    );
    });
  }

}
