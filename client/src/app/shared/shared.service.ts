import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import {Employee} from '../_models/employee'

@Injectable({
  providedIn: 'root'
})

export class SharedService{
  private alertMessage = new Subject<any>();
  employeeData: Employee;
  isLogged :boolean;
  loginState: BehaviorSubject<any>;
  loginStateObservable: Observable<string>;
  selectState: BehaviorSubject<string>;
  selectStateObservable: Observable<string>;

  constructor() {
    this.isLogged=false;
    this.loginState = new BehaviorSubject<any>('None');
    this.loginStateObservable = this.loginState.asObservable();
    this.selectState = new BehaviorSubject<string>('main');
    this.selectStateObservable = this.selectState.asObservable();
  }

  loginUser(data:Employee) {
    this.employeeData=data;
    this.isLogged=true;
    localStorage.setItem('employeeData',JSON.stringify(data));
    localStorage.setItem('isLogged',JSON.stringify(this.isLogged));
    console.log(this.employeeData.status);
    this.loginState.next(this.employeeData.status);
  }

  selectMenu(selected:string){ 
    this.selectState.next(selected);
  }
  
  sendAlertEvent(e : any) {
    this.alertMessage.next(e);
  }

  getAlertEvent(): Observable<any>{ 
    return this.alertMessage.asObservable();
  }

  WebRefreshed(){
     this.isLogged = JSON.parse(localStorage.getItem('isLogged'));
     if(this.isLogged){
     this.employeeData = JSON.parse(localStorage.getItem('employeeData'));
     this.loginState.next(this.employeeData.status);
    }
  }

  logoutUser(){
    localStorage.removeItem('isLogged');
    localStorage.removeItem('employeeData');
    this.isLogged=false;
  }
  
}