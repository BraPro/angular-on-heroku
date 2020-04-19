import { Component, OnInit } from '@angular/core';
import { ViewContainerRef, ComponentFactoryResolver, ComponentFactory, ComponentRef, ViewChild } from '@angular/core';
import { SharedService } from './../shared.service';
import { Subscription}  from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})
export class SideComponent implements OnInit {
  @ViewChild('menu') menu;
  permission:boolean = false;
  selected:string = 'Income';
  subscription: Subscription;
  public _router: Router;

  constructor(private _loginService: SharedService) {
    this._loginService.loginStateObservable.subscribe(res => {
      if (res == 'admin')
        this.permission = true;
      else
        this.permission = false;
    })
  }

  Select(element:string){
   if(this.selected==element){return};
   this.selected=element;
   this._loginService.selectMenu(element);
  }

  ngOnInit(){
    this._loginService.selectMenu(this.selected);
  }

}

 
