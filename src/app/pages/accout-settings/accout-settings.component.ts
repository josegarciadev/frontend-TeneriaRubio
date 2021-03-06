import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';


// services
import { SettingsService } from '../../services/services.index';


@Component({
  selector: 'app-accout-settings',
  templateUrl: './accout-settings.component.html',
  styles: []
})
export class AccoutSettingsComponent implements OnInit {


  constructor(
              public _ajustes: SettingsService) { }
  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor(tema: string, link: any ) {
      console.log(tema);
      this.aplicarcheck(link);
      this._ajustes.aplicarTema(tema);
  }

  aplicarcheck(link: any){
    let selectores: any = document.getElementsByClassName('selector') ;
    for(let ref of selectores){
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

  colocarCheck(){
    let selectores : any = document.getElementsByClassName('selector') ;
    let tema = this._ajustes.ajustes.tema;
    for(let ref of selectores){
      if(ref.getAttribute('data-theme') === tema){
          ref.classList.add('working');
          break;
      }
    }
  }
}
