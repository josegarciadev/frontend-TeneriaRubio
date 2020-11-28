import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import {EntradaempleadosService} from '../../services/services.index';
import {SalidaempleadoService} from '../../services/services.index';
import {EntradalineaService} from '../../services/services.index';
import {SalidalineaService} from '../../services/services.index';
@Component({
  selector: 'app-graficas',
  templateUrl: './graficas1.component.html',
  styles: []
})
export class Graficas1Component implements OnInit {

  public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  
  public doughnutChartType: ChartType = 'doughnut';
  
  graficos: any = {
    grafico1: {
      labels: ['s','s'],
      data:  [1,1],
      type: 'doughnut',
      leyenda: 'Entradas y salidas empleados',
    },
    grafico2: {
      labels: ['s', 's'],
      data:  [1, 1],
      type: 'doughnut',
      leyenda: 'Entrada y salidas de lineas'
    },
  };
  public user; 
  constructor(private _entSvc:EntradaempleadosService,private _salSvc:SalidaempleadoService,private _entLineaSvc :EntradalineaService, private _salLineaSvc:SalidalineaService) { }

  ngOnInit() {
   this.getEntEmp();
   this.getSalEmp();
   this.getEntLinea();
   this.getSalLinea();
  this.user =JSON.parse(sessionStorage.getItem('user'));
  }

  getEntEmp(){
    this._entSvc.getEntrada().subscribe(
      res=>{
        let data:any= res;
        this.graficos.grafico1.labels[0]='Entrada empleados';
        this.graficos.grafico1.data[0] =data.valor;
        
      },
      err=>console.error(err)
    )
  }

  getSalEmp(){
    this._salSvc.getSalida().subscribe(
      res=>{
        let data:any= res;
        this.graficos.grafico1.labels[1]='Salida empleados';
        this.graficos.grafico1.data[1] =data.valor;
     
      },
      err=>console.error(err)
    )
  }
  getEntLinea(){
    this._entLineaSvc.getEntrada().subscribe(
      res=>{
        let data:any= res;
        this.graficos.grafico2.labels[0]='Entrada linea';
        this.graficos.grafico2.data[0] =data.valor;
      
      },
      err=>console.error(err)
    )
  }

  getSalLinea(){
    this._salLineaSvc.getSalidas().subscribe(
      res=>{
        let data:any= res;
        this.graficos.grafico2.labels[1]='Salida linea';
        this.graficos.grafico2.data[1] =data.valor;
        
      },
      err=>console.error(err)
    )
  }

}
