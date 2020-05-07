import { Component, ɵConsole } from '@angular/core';
import { SharedService } from './../shared.service';
import * as Highcharts from "highcharts";
import { GarageService } from '@app/_services';
import { first } from 'rxjs/operators';



@Component({
  selector: 'app-brandchart',
  templateUrl: './brandchart.component.html',
  styleUrls: ['./brandchart.component.css']
})
export class BrandchartComponent {

  updateFromInput = false;
  permission: string;  //'New Employee','Employee', 'Manager', 'Admin', 'None'
  Highcharts = Highcharts;
  chart;
  chartConstructor = "chart";
  chartCallback;
  chartOptions = {   
    chart: {
       type: "spline"
    },
    title: {
       text: "Monthly Garages Income"
    },
    xAxis:{
       categories:this.Datefunc()
    },
    yAxis: {          
       title:{
          text:"Incomes"
       } 
    },
    tooltip: {
      pointFormat: '<span style="color:{series.color}">{series.name}</span>: Income=<b>{point.y}</b>, Value=<b>{point.amount}<b> <br/>',
      split: true
  } ,
  series:[],
  exporting: {
    enabled: true
  },
    
  };


	constructor(private sharedService:SharedService,private garageService:GarageService) {
    this.sharedService.loginStateObservable.subscribe(res => {
      this.permission = res;
      const self = this;
      // saving chart reference using chart callback
      this.chartCallback = chart => {
        self.chart = chart;
      };
    
      if(this.permission=="Admin")
        this.adminChart();
      else
        this.userChart();
    });
    
  }

  adminChart(){
    this.garageService.getAllReports()
    .pipe(first())
     .subscribe(
    data => {
      var newseries = [];
      data.forEach(function (garage) {
          var temp = this.datafillfunc(garage);
          var element = [garage.name,temp,['y', 'x', 'amount']];
          newseries.push(element);
          //console.log(this.data);
      }.bind(this));
      this.onInitChart(newseries);

  
  
    },
     error => {
      //this.alertService.error(error);
     this.sharedService.sendAlertEvent({response: 'Error', msg: 'Check your internet connection'});
    },
    () => {
     });

  }


  userChart(){
   
  }

  Datefunc(){
    const month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var col = new Array();
    var ndate = new Date(Date.now());
    for(let i=0; i<12; i++){
      col.unshift(month_names_short[ndate.getMonth()] + "/" + ndate.getFullYear());
      ndate.setMonth(ndate.getMonth() - 1);
    }
    return col;
  }

  datafillfunc(reportlist){

    var col = new Array();
    var ndate = new Date(Date.now());
    var sdate = new Date(ndate.getFullYear(), ndate.getMonth(), 1);
    sdate.setMonth(ndate.getMonth() - 11);

    for(let i = 0; i < 12; i++){
      col.push([0,i,0]);
    }

    for(let i = 0; i < reportlist.length; i++){
      var mindex = reportlist[i]._id.getMonth() - sdate.getMonth() +
                    (12 * (reportlist[i]._id.getFullYear() - sdate.getFullYear()));
      col[mindex] = [reportlist[i].cost, mindex, reportlist[i].count];
    }

    return col;
  }

  onInitChart(newseries) {
    const self = this,
      chart = this.chart;

    chart.showLoading();
    setTimeout(() => {
      chart.hideLoading();

      self.chartOptions.series =newseries;

      self.updateFromInput = true;
    }, 2000);
  }


}




  

  

