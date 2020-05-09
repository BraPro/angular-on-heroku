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
  managerName:string;
  garageName:string;
  garageAddress:string;
  garagesNum:number;
  usersNum:number;
  monthIncome:number;


  constructor(private sharedService : SharedService, private userService : UserService ,private garageService : GarageService) {
  }

	ngOnInit() {
    this.user = this.userService.currentUserValue;
    switch(String(this.user.status)){
      case 'Admin':
        this.getAdminReport(); 
        break;
      case 'Employee':
        this.getGarageReport();
        break;
      case 'Manager':
        this.getGarageReport();
      break;
      default:
        break;
    }
  }

  getGarageReport() {
    this.garageService.getReportById(Number(this.user.garage))
		.pipe(first())
		.subscribe(
			data => {
        //import to table
        this.managerName = data.manager.firstname + ' ' + data.manager.lastname; 
        this.garageName = data.name;
        this.garageAddress = data.location.country + ', ' + data.location.city +', '+ data.location.street;
			});
     }
    

  getAdminReport(){
    this.garageService.getAllReports()
	  .pipe(first())
	  .subscribe(
			data => {
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
			});

     }


}

