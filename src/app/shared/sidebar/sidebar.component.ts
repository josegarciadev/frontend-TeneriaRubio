import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/services.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  public query :any = [];
  constructor(public sidebarService: SidebarService) { }

  ngOnInit() {
    this.getList();
  }

  getList(){
    this.sidebarService.listMenu()
      .subscribe(
        res =>{
          this.query = res;
          for(let i=0; i < this.query.length; i++){
            this.query[i].submenu= JSON.parse(this.query[i].submenu);
           
          }
       
        },
        err => console.error(err)
      )
  }

}
