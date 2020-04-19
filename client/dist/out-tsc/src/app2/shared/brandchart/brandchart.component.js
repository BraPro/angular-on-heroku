import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { ViewContainerRef, ViewChild } from '@angular/core';
import { AlertComponent } from '../../shared/alert/alert.component';
import * as Highcharts from 'highcharts';
let BrandchartComponent = class BrandchartComponent {
    constructor(modalService, componentFactoryResolver, sharedService) {
        this.modalService = modalService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.sharedService = sharedService;
        this.title = 'myHighchart';
        this.data = [{
                name: 'Afula-Shlomi',
                data: [500, 700, 555, 444, 777, 877, 944, 567, 666, 789, 456, 654]
            }, {
                name: 'Kiriatata-Arik',
                data: [677, 455, 677, 877, 455, 778, 888, 567, 785, 488, 567, 654]
            }, {
                name: 'Kiriatyam-Dor',
                data: [455, 455, 567, 877, 666, 778, 888, 700, 785, 488, 567, 500]
            }];
        this.highcharts = Highcharts;
        this.chartOptions = {
            chart: {
                type: "spline"
            },
            title: {
                text: "Monthly Garages Income"
            },
            xAxis: {
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            },
            yAxis: {
                title: {
                    text: "Incomes"
                }
            },
            series: this.data
        };
        this.clickEventsubscription = this.sharedService.getClickEvent().subscribe(val => {
            this.openAlert(val);
        });
    }
    openAlert(val) {
        this.componentRef && this.componentRef.destroy();
        const factory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        this.componentRef = this.alertContainer.createComponent(factory);
        this.componentRef.instance.altMessage = val.msg;
        this.componentRef.instance.altRes = val.res;
        this.modalService.open('custom-modal-alert');
    }
    closeAlert() {
        this.modalService.close('custom-modal-alert');
    }
};
__decorate([
    ViewChild("Alert", { read: ViewContainerRef })
], BrandchartComponent.prototype, "alertContainer", void 0);
BrandchartComponent = __decorate([
    Component({
        selector: 'app-brandchart',
        templateUrl: './brandchart.component.html',
        styleUrls: ['./brandchart.component.css']
    })
], BrandchartComponent);
export { BrandchartComponent };
//# sourceMappingURL=brandchart.component.js.map