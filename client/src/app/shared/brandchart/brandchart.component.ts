import { Component, OnInit } from '@angular/core';
import { SharedService } from './../shared.service';
import * as Highcharts from "highcharts";
import { GarageService, UserService } from '@app/_services';
import { first } from 'rxjs/operators';
import { GarageReport } from '@app/_models';

@Component({
  selector: 'app-brandchart',
  templateUrl: './brandchart.component.html',
  styleUrls: ['./brandchart.component.css']
})

export class BrandchartComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor: string = 'chart';
  updateFlag: boolean = false;
  oneToOneFlag: boolean = true;
  runOutsideAngular: boolean = false;

  chart : Highcharts.Chart;
  chartOptions : any = {   
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
      pointFormat: '<span style="color:{series.color}">{series.name}</span>:<br>M.Income=<b>{point.y}</b><br>Treatments=<b>{point.amount}<b>',
      split: true
    },
    series: [],
    exporting: {
      enabled: true
    }
  };

  constructor(private sharedService : SharedService,
    private garageService:GarageService,
    private userService : UserService) {
  }

  ngOnInit() {
    this.chart = Highcharts.chart('container', this.chartOptions);
    this.Highcharts.setOptions({lang:{thousandsSep:','}});
    this.chart.redraw();

    this.sharedService.getGarageReportEvent().subscribe(greport => { 
      var newseries = [];
      for(let i = 0; i < greport.length; i++){
        let garage : GarageReport = greport[i];
        var temp = this.datafillfunc(garage.report);
        var element={
          name: garage.name,
          keys: ['y', 'x', 'amount'],
          data: temp};
        newseries.push(element);
      }
      this.chartOptions.series = newseries;
      this.updateFlag = true;
    });
    /*
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
    */
  }

  /*
  adminChart() {
    this.garageService.getAllReports().pipe(first())
    .subscribe(data => {
      var newseries = [];
      for(let i = 0; i < data.length; i++){
        let garage : GarageReport = data[i];
        var temp = this.datafillfunc(garage.report);
        var element={
          name: garage.name,
          keys: ['y', 'x', 'amount'],
          data: temp};
        newseries.push(element);
      }
      this.chartOptions.series = newseries;
      this.updateFlag = true;
    });
  }


  userChart(){
    this.garageService.getReportById(Number(this.userService.currentUserValue.garage)).pipe(first())
    .subscribe(data => {
      var newseries = [];
        var temp = this.datafillfunc(data.report);
        var element={
          name: data.name,
          keys: ['y', 'x', 'amount'],
          data: temp};
      newseries.push(element);
      this.chartOptions.series = newseries;
      this.updateFlag = true;
    });
  }

  */
 
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
      var rdate = new Date(reportlist[i]._id);
      var mindex = rdate.getMonth() - sdate.getMonth() +
                    (12 * (rdate.getFullYear() - sdate.getFullYear()));
      col[mindex] = [reportlist[i].cost, mindex, reportlist[i].count];
    }

    return col;
  }
}




  

  

