import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let prueba = JSON.parse(localStorage.getItem('usuario'));
    console.log(prueba);
  }


}
