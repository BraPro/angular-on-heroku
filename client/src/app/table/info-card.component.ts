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
  garagesNum:number;
  usersNum:number;
  monthIncome:number;


  constructor(private userService : UserService ,private garageService : GarageService, private _loginService: SharedService) {
    this.user = this.userService.currentUserValue;
    this._loginService.loginStateObservable.subscribe(res => {
      this.permission = res;
    });
    if(this.permission == "Employee" || this.permission == "Manager")
       this.getGarageReport();
    if(this.permission == "Admin") 
       this.getAdminReport();  
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
    

  getAdminReport(){
    this.garageService.getAllReports()
	  .pipe(first())
	  .subscribe(
			data => {
        //import to table
        this.data=data;
        this.garagesNum=this.data.length 
        this.usersNum=0;
        this.monthIncome=0;
        data.forEach(function (garageReport) {
         this.usersNum+=garageReport.employees;
         if(garageReport.report.length)
         this.monthIncome+=garageReport.report[garageReport.report.length-1].cost;
          //garageReport.report.lastIndexOf;
        }.bind(this));
			},
			error => {
				//this.alertService.error(error);
				this._loginService.sendAlertEvent(error);
			},);

     }


}

