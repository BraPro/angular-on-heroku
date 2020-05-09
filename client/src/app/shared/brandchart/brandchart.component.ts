import { Component, OnInit } from '@angular/core';
import { SharedService } from './../shared.service';
import * as Highcharts from "highcharts";
import { GarageService, UserService } from '@app/_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-brandchart',
  templateUrl: './brandchart.component.html',
  styleUrls: ['./brandchart.component.css']
})

export class BrandchartComponent implements OnInit {
  updateFromInput = false;
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

  constructor(private sharedService : SharedService,
    private garageService:GarageService,
    private userService : UserService) {
      const self = this;
      this.chartCallback = chart => {
        const self = chart;
      };
  }

  ngOnInit() {
    switch(String(this.userService.getUserPermission())){
      case 'Admin':
        this.adminChart();
        break;
      case 'Employee':
        this.userChart();
        break;
      case 'Manager':
        this.userChart();
      break;
      default:
        break;
    }
  }

  adminChart(){
    this.garageService.getAllReports().pipe(first())
    .subscribe(data => {
      var newseries = [];
      data.forEach(function (garage) {
          var temp = this.datafillfunc(garage);
          var element={
            name: garage.name,
            keys: ['y', 'x', 'amount'],
            data: temp};
          newseries.push(element);
      }.bind(this));
      this.chartOptions.series=newseries;
      this.highcharts.chart('container',this.chartOptions);
    });
  }


  userChart(){
    this.garageService.getReportById(Number(this.userService.currentUserValue.garage)).pipe(first())
    .subscribe(data => {
      var newseries = [];
      var temp = this.datafillfunc(data);
      var element={
        name: data.name,
        keys: ['y', 'x', 'amount'],
        data: temp};
      newseries.push(element);
      this.chartOptions.series=newseries;
      this.highcharts.chart('container',this.chartOptions);
    });
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




  

  

