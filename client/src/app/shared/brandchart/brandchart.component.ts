import { Component } from '@angular/core';
import { ViewContainerRef, ComponentFactoryResolver, ComponentFactory, ComponentRef, ViewChild } from '@angular/core';
import { ModalService } from '../../_modal';
import { AlertComponent } from '../../shared/alert/alert.component';
import { SharedService } from './../shared.service';
import { Subscription } from 'rxjs';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-brandchart',
  templateUrl: './brandchart.component.html',
  styleUrls: ['./brandchart.component.css']
})
export class BrandchartComponent {
 
 
   
  data = [{
          name: 'Afula-Shlomi',
          data: [500, 700, 555, 444, 777, 877, 944, 567, 666, 789, 456, 654]
       },{
          name: 'Kiriatata-Arik',
          data: [677, 455, 677, 877, 455, 778, 888, 567, 785, 488, 567, 654]
       },{
        name: 'Kiriatyam-Dor',
        data: [455, 455, 567, 877, 666, 778, 888, 700, 785, 488, 567, 500]
       }];
 
  highcharts = Highcharts;
  chartOptions = {   
    chart: {
       type: "spline"
    },
    title: {
       text: "Monthly Garages Income"
    },
    xAxis:{
       categories:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    },
    yAxis: {          
       title:{
          text:"Incomes"
       } 
    },
    series: this.data
  };

  clickEventsubscription:Subscription
  
	@ViewChild("Alert", { read: ViewContainerRef }) alertContainer;

	componentRef: ComponentRef<AlertComponent>;

	constructor(
		private modalService: ModalService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private sharedService:SharedService
    ) {
        this.clickEventsubscription=this.sharedService.getAlertEvent().subscribe(val => {
          this.openAlert(val);
        });
  }

  openAlert(val : any) {
		this.componentRef && this.componentRef.destroy();
    const factory: ComponentFactory<any> = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    this.componentRef = this.alertContainer.createComponent(factory);
    this.componentRef.instance.altMessage = val.msg;
    this.componentRef.instance.altRes = val.res;
		this.modalService.open('custom-modal-alert');
	}

  closeAlert() {
        this.modalService.close('custom-modal-alert');
  }


  
}
