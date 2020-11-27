import { Component,OnInit} from '@angular/core';
import { SettingsService } from './services/services.index';
declare function init_plugins();
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Teneria Rubio';

  constructor(public _Ajutes: SettingsService){
    
  }
  ngOnInit() {
    init_plugins();
    
  }
  
}
