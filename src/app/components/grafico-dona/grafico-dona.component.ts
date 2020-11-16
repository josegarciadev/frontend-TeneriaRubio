import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

@Input('LabelsC') doughnutChartLabels: string[];
@Input('DataC') doughnutChartData: number[];
@Input('TypeC') doughnutChartType: string[];

  constructor() { }

  ngOnInit() {
  }

}
