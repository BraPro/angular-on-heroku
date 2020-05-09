import { Component } from '@angular/core';
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
  highcharts = Highcharts;
  chart = this.highcharts.chart;
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

  option2= {
    chart: {
        type: 'line'
    },
    title: {
        text: 'Monthly Average Temperature'
    },
    subtitle: {
        text: 'Source: WorldClimate.com'
    },
    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
        title: {
            text: 'Temperature (°C)'
        }
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        }
    },
    series: [{
        name: 'Tokyo',
        data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
    }, {
        name: 'London',
        data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
    }]
}


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
          var element = [[garage.name],[temp],['y', 'x', 'amount']];
          newseries.push(element);
          this.chartOptions.series=newseries;
          //this.highcharts.chart('container',this.chartOptions);
         // this.highcharts.chart('container',this.option2);
          //console.log(this.data);
      }.bind(this));

       //alert(this.chartOptions.series[0]);
      //alert(this.option2.series);
      
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


}




  

  

