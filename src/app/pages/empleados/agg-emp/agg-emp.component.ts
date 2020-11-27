import { Component, OnInit } from '@angular/core';
import {EmpleadosService} from '../../../services/services.index';
import {DepartamentosService} from '../../../services/services.index';
import {Empleados} from '../../../Models/empleados';
import {Router,ActivatedRoute}  from '@angular/router';
import swal from 'sweetalert';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
@Component({
  selector: 'app-agg-emp',
  templateUrl: './agg-emp.component.html',
  styles: []
})
export class AggEmpComponent implements OnInit {
    public date= new Date();
    public empleadosForm:FormGroup;
    public user:any ;
    public estado :boolean=false;
    public query:any=[];
    public params;
  constructor(private empleadosServices: EmpleadosService,private router:Router, private departamentosServices:DepartamentosService,
    private activatedRouter:ActivatedRoute, private _fb:FormBuilder) {
     }

  ngOnInit() {
    this.empleadosForm=this._fb.group({
      cedula:  [0,[Validators.required,Validators.minLength(6),Validators.maxLength(11)]],
      nombres: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(70)]],
      genero: ['',[Validators.required]],
      fecha_nac: ['',[Validators.required]],
      direccion: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(100)]],
      telefono: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(11)]],
      id_departamento: ['',[Validators.required]],
    });

    this.getList();
    this.user= JSON.parse(sessionStorage.getItem('user'));
    this.params=this.activatedRouter.snapshot.params.id;
    if(this.params){
      this.getOne(this.params);
      this.estado=true;
    }
  }

  get cedula(){return this.empleadosForm.get('cedula')}
  get nombres(){return this.empleadosForm.get('nombres')}
  get genero(){return this.empleadosForm.get('genero')}
  get fecha_nac(){return this.empleadosForm.get('fecha_nac')}
  get direccion(){return this.empleadosForm.get('direccion')}
  get telefono(){return this.empleadosForm.get('telefono')}
  get id_departamento(){return this.empleadosForm.get('id_departamento')}
  
  submit(){
    if(this.empleadosForm.valid){

      if(this.estado===true){
        this.updateEmp(this.empleadosForm.value);
      }else{
        this.saveEmp(this.empleadosForm.value);
      }
    }
  }
  cancelar(){
    this.router.navigate(['/empleados']);
  }
  saveEmp(empleado){
    swal("¿Esta seguro de crear la entrada de linea?")
    .then((value) => {
      
      
      empleado.id_user = this.user.id_usuario;
      empleado.nombre_user= this.user.user;
      console.log('save',empleado);
      this.empleadosServices.createEmp(empleado)
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
          this.empleadosForm.patchValue(res);
          
        },
        err=>console.error(err)
      );
  }
  updateEmp(empleado){

    swal("Actualizar",'¿Esta seguro de actualizar?', 'warning')
      .then((value) => {
       
        empleado.id_user = this.user.id_usuario;
        empleado.nombre_user = this.user.user;
    
        this.empleadosServices.updateEmp(this.params, empleado)
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
