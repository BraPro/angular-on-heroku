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
  permission: string;  //'New Employee','Employee', 'Manager', 'Admin', 'None'
  selected:string;  //'Income','Treatment','Map','Users','Welcome','Blocked'
  subscription: Subscription;
  router: Router;

  constructor(private userService : UserService, private sharedService : SharedService) {
    this.sharedService.getLoginStateEvent().subscribe(res => {
        this.permission = res;
        this.putselect(); 
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
   this.sharedService.sendSelectMenu(element);
  }

  endsession(){
      this.userService.logout()
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/']); //need to delete!!
        }); 
  }

  checkpermission(element:string){
    if(element=="active"){
      return (this.permission =='Admin'||this.permission =='Manager'||this.permission =='Employee');
    }else if(element=="users"){
      return (this.permission =='Admin'||this.permission =='Manager');
    }else if(element=="welcome"){
      return (this.permission =='New Employee');
    }else if(element=="blocked"){
      return (this.permission =='None');
    }

    return false;
  }

  ngOnInit(){
    if(this.userService.isLoggin()){
        this.sharedService.sendLoginState(this.userService.getUserPermission());
    }
    this.putselect();
    this.sharedService.sendSelectMenu(this.selected);
  }

  

}

 
