import { Component } from '@angular/core';
import { SharedService } from '../shared/shared.service';


@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.css']
	
})
export class MainComponent {

  selected:string = 'Income';
  constructor(private SelectService: SharedService) {
    this.SelectService.getSelectMenuEvent().subscribe(res => {
        this.selected = res;   
    })
  }

 checkselected(src:string)
 {
   if(src==this.selected)
     return true;
   else
     return false;

 }


}
  