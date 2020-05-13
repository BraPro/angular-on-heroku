import { Component, OnInit } from '@angular/core';
import { UserService, GarageService } from '@app/_services';
import { Employee } from '@app/_models';
import { SharedService } from '@app/shared/shared.service';
import { first } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Variable } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.css'],
})

export class InfoCardComponent implements OnInit {
  user: Employee; 
  data:any;
  managerName:string;
  garageName:string;
  garageAddress:string;
  garagesNum:number;
  usersNum:number;
  monthIncome:number;


  constructor(private sharedService : SharedService,
    private userService : UserService,
    private garageService : GarageService,
    private http: HttpClient) {
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
        this.http.get<Variable>(`${environment.apiUrl}/sync/${this.userService.currentUserValue._id}`, { headers: new HttpHeaders({ 'None': 'true'})})
        .pipe(first()).subscribe(data => {
          if(data['update']){
            this.userService.refreshData().subscribe(()=>{
              this.sharedService.sendLoginState(this.userService.getUserPermission());
            });
        }});
        break;
    }
  }

  getUserPermission(){
    return this.userService.getUserPermission()
  }

  getGarageReport() {
    this.garageService.getReportById(Number(this.user.garage)).pipe(first())
    .subscribe(data => {
        var greport = data[0];
        this.managerName = greport.manager.firstname + ' ' + greport.manager.lastname; 
        this.garageName = greport.name;
        this.garageAddress = greport.location.country + ', ' + greport.location.city +', '+ greport.location.street;
        this.sharedService.sendGarageReport(data);
		});
  }
    

  getAdminReport(){
    this.garageService.getAllReports().pipe(first())
	  .subscribe(data => {
        this.data=data;
        this.garagesNum=this.data.length 
        this.usersNum=0;
        this.monthIncome=0;
        data.forEach(function (garageReport) {
         this.usersNum += garageReport.employees;
         if(garageReport.report.length)
          this.monthIncome+=garageReport.report[garageReport.report.length-1].cost;
        }.bind(this));
        this.sharedService.sendGarageReport(data);
			});
  }
}

