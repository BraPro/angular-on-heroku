import { Component } from '@angular/core';

import { ViewContainerRef, ComponentFactoryResolver, ComponentFactory, ComponentRef, ViewChild } from '@angular/core';
import { ModalService } from '../../_modal';
import { AlertComponent } from '../../shared/alert/alert.component';
import { SharedService } from './../shared.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
 
  status:boolean = true;
  clickEventsubscription:Subscription
  
	@ViewChild("Alert", { read: ViewContainerRef }) alertContainer;

	componentRef: ComponentRef<AlertComponent>;

	constructor(
    public _router: Router,
		private modalService: ModalService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private sharedService:SharedService
    ) {
        this.clickEventsubscription=this.sharedService.getClickEvent().subscribe(val => {
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

  showheader(){
    this.status=true;
  }

  hideheader(){
    this.status=false;
  }

  geturl()
  { 
      return this._router.url;
  }
  
}
