import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { ViewContainerRef, ViewChild } from '@angular/core';
import { AlertComponent } from '../../shared/alert/alert.component';
let HeaderComponent = class HeaderComponent {
    constructor(_router, modalService, componentFactoryResolver, sharedService) {
        this._router = _router;
        this.modalService = modalService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.sharedService = sharedService;
        this.status = true;
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
    showheader() {
        this.status = true;
    }
    hideheader() {
        this.status = false;
    }
};
__decorate([
    ViewChild("Alert", { read: ViewContainerRef })
], HeaderComponent.prototype, "alertContainer", void 0);
HeaderComponent = __decorate([
    Component({
        selector: 'app-header',
        templateUrl: './header.component.html',
        styleUrls: ['./header.component.css']
    })
], HeaderComponent);
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map