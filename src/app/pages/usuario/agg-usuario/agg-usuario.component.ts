import { Component, OnInit } from '@angular/core';
import {UsuarioService} from '../../../services/services.index';
import {Usuario} from '../../../Models/usuario';
import {Router,ActivatedRoute}  from '@angular/router';
import swal from 'sweetalert';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
@Component({
  selector: 'app-agg-usuario',
  templateUrl: './agg-usuario.component.html',
  styles: []
})
export class AggUsuarioComponent implements OnInit {
  public formUser: FormGroup;

  public params;
  public user:any = JSON.parse(sessionStorage.getItem('user'));
  public query:any=[];
  public estado :boolean=false;
  constructor(private usuarioServices: UsuarioService,private router:Router,private activatedRouter:ActivatedRoute,private _fb:FormBuilder) { }

  ngOnInit() {
    this.formUser= this._fb.group({
      cedula: ['',[Validators.required,Validators.minLength(6),Validators.maxLength(11)]],
      nombre:['',[Validators.required,Validators.minLength(4),Validators.maxLength(30)]],
      apellido:['',[Validators.required,Validators.minLength(4),Validators.maxLength(30)]],
      telefono:['',[Validators.required,Validators.minLength(6),Validators.maxLength(11)]],
      correo_elec:['',[Validators.required,Validators.minLength(4),Validators.maxLength(100),Validators.email]],
      user: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(30)]],
      pass:['',[Validators.required,Validators.minLength(4),Validators.maxLength(30)]],
      direccion:['',[Validators.required,Validators.minLength(4),Validators.maxLength(100)]],
      status:['',[Validators.required]],
      rol:['',[Validators.required]],
    });
    this.gerRol();
  
    this.params=this.activatedRouter.snapshot.params.id;
    if(this.params){
      this.getOne(this.params);
      this.estado=true;
    }
  }
  get cedula(){return this.formUser.get('cedula');}
  get nombre(){return this.formUser.get('nombre');}
  get apellido(){return this.formUser.get('apellido');}
  get telefono(){return this.formUser.get('telefono');}
  get correo_elec(){return this.formUser.get('correo_elec');}
  get users(){return this.formUser.get('user');}
  get pass(){return this.formUser.get('pass');}
  get direccion(){return this.formUser.get('direccion');}
  get status(){return this.formUser.get('status');}
  get rol(){return this.formUser.get('rol');}
  submit(){
    if(this.formUser.valid){
      if(this.estado===true){
        this.updateUser(this.formUser.value);
      }else{
        this.saveUser(this.formUser.value);
      }
    }
  }
  cancelar(){
    this.router.navigate(['/usuarios']);
  }
  saveUser(usuario){
    swal({
      title:'Agregar',
      text: '¿Seguro de agregar el usuario?',
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
      usuario.id_user = this.user.id_usuario;
      usuario.nombre_user= this.user.user;
      this.usuarioServices.createUser(usuario)
      .subscribe(
        res=>{ 
          swal('Perfecto','El Usuario fue agregado con exito','success');
          
          this.router.navigate(['/usuarios']);
        },
        err=> console.error(err)
      );
      }
      if(value==='cancelar'){
        swal.close();
      }
     
    });
        
  }



  getOne(id:number | string){
    this.usuarioServices.getOneUser(id)
      .subscribe(
        res=>{
          this.formUser.patchValue(res);
          
        },
        err=>console.error(err)
      );
  }
  gerRol(){
    this.usuarioServices.getrol().subscribe(
      res=>{
        this.query = res;
       
      },
      err => console.error(err)
    )
  }
  

  updateUser(usuario){

   swal({
      title:'Actualizar',
      text: '¿Seguro de actualizar el usuario?',
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

       
          usuario.id_user = this.user.id_usuario;
          usuario.nombre_user = this.user.user;
          
          this.usuarioServices.updateUser(this.params,usuario)
                  .subscribe(
                    res =>{
                    swal('Perfecto','El usuario fue actualizado con exito','success');
                    this.router.navigate(['/usuarios']);
                    console.log(res);},
                  err=> console.error(err)
        ); 
        }
        if(value==='cancelar'){
          swal.close();
        }

      });
    }
}
