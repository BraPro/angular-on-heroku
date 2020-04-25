import { Component, OnInit } from '@angular/core';
import { ViewContainerRef, ComponentFactoryResolver, ComponentFactory, ComponentRef, ViewChild } from '@angular/core';
import { SharedService } from './../shared.service';
import { Subscription}  from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '@app/_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})
export class SideComponent implements OnInit {
  @ViewChild('menu') menu;
  permission: string;//'New Employee','Employee', 'Manager', 'Admin', 'None'
  selected:string;
  subscription: Subscription;
  public _router: Router;
  router: any;
  sharedService: any;

  constructor(private _loginService: SharedService, private userService : UserService) {
    this._loginService.loginStateObservable.subscribe(res => {
        this.permission = res;
        if(this.permission =='New Employee')
           this.selected='Welcome';
        if(this.permission =='None')   
           this.selected='Blocked'; 
    })
  }

  putselect()
  {
    if(this.permission =='New Employee')
    this.selected='Welcome';
    else if(this.permission =='None')   
    this.selected='Blocked';
    else 
    this.selected='Income';
  }

  Select(element:string){
   if(this.selected==element){return};
   this.selected=element;
   this._loginService.selectMenu(element);
  }

  endsession(){
      this.userService.logout()
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/']); //need to delete!!
        },
        error => {
          //this.alertService.error(error);
          this.sharedService.sendAlertEvent({response: 'Error', msg: 'Check your internet connection'});
        }); 
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
    this.putselect();
    this._loginService.selectMenu(this.selected);
  }

  

}

 
