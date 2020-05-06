import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService, GarageService } from '@app/_services';
import { Employee } from '@app/_models';
import { SharedService } from '@app/shared/shared.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.css'],
})
export class InfoCardComponent implements OnInit {
  user: Employee; 
  permission: string;  //'New Employee','Employee', 'Manager', 'Admin', 'None'
  data:any;


  constructor(private userService : UserService ,private garageService : GarageService, private _loginService: SharedService) {
    this.user = this.userService.currentUserValue;
    this._loginService.loginStateObservable.subscribe(res => {
      this.permission = res;
    });
    if(this.permission == "Employee" || this.permission == "Manager")
       this.getGarageReport();
  }

	ngOnInit() {
    this.getGarageReport();
  }

  getGarageReport() {
    
    this.garageService.getReportById(<any>this.user.garage)
		.pipe(first())
		.subscribe(
			data => {
        //import to table
        this.data=data;  
			},
			error => {
				//this.alertService.error(error);
				this._loginService.sendAlertEvent(error);
			},);
     }
    
}

