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
  permission: string //'New Employee','Employee', 'Manager', 'Admin', 'None'
  selected:string = 'Income';
  subscription: Subscription;
  public _router: Router;

  constructor(private _loginService: SharedService) {
    this._loginService.loginStateObservable.subscribe(res => {
        this.permission = res;
    })
  }

  Select(element:string){
   if(this.selected==element){return};
   this.selected=element;
   this._loginService.selectMenu(element);
  }

  checkpermission(element:string){
    if(element=="active"){
      if(this.permission =='Admin'||this.permission =='Manager'||this.permission =='Employee')
      return true;
      else return false;
    }else if(element=="users"){
      if(this.permission =='Admin'||this.permission =='Manager')
      return true;
      else return false;
    }else if(element=="welcome"){
      if(this.permission =='New Employee')
       return true
       else return false;
    }else if(element=="blocked"){
      if(this.permission =='None')
      return true
      else return false;
    }

    return false;
  }

  ngOnInit(){
    this._loginService.selectMenu(this.selected);
  }

}

 
