import { Component, OnInit } from '@angular/core';
import {ProdproveeService} from '../../services/services.index';
import {Router} from '@angular/router';
@Component({
  selector: 'app-prodprov',
  templateUrl: './prodprov.component.html',
  styles: []
})
export class ProdprovComponent implements OnInit {
  public query :any =[];
  constructor(private prodprovServices: ProdproveeService, private router: Router) { }

  ngOnInit() {
    this.getList();
  }

  getList(){
    this.prodprovServices.getProdprov()
      .subscribe(
        res=>{
          this.query = res;
        },
        err=>console.error(err)
      );
  }

  deleteProdprov(id:number | string){
    this.prodprovServices.deleteProdprov(id)
          .subscribe(
            res=>{
              console.log(res);
              this.getList();
            },
            err=>console.error(err)
          );
  }

}
