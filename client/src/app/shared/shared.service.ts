import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import {Employee} from '../_models/employee'

@Injectable({
  providedIn: 'root'
})

export class SharedService {
  private alertMessage = new Subject<any>();
  private lol:string;
  employeeData: Employee;
  
  loginState: BehaviorSubject<any>;
  loginStateObservable: Observable<string>;
  selectState: BehaviorSubject<string>;
  selectStateObservable: Observable<string>;

  constructor() {
    this.loginState = new BehaviorSubject<any>('loggedout');
    this.loginStateObservable = this.loginState.asObservable();
    this.selectState = new BehaviorSubject<string>('main');
    this.selectStateObservable = this.selectState.asObservable();
  }

  loginUser(data:Employee) {
    this.employeeData=data;
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
  


  
}