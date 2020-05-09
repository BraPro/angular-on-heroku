import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Employee } from '../_models/employee'

@Injectable({
  providedIn: 'root'
})

export class SharedService{
  alertMessage = new Subject<any>();
  //loginState: BehaviorSubject<any>;
  //loginStateObservable: Observable<string>;
  //selectState: BehaviorSubject<string>;
  //selectStateObservable: Observable<string>;
  loginState = new Subject<string>();
  //loginStateObservable: Observable<string>;
  selectState = new Subject<string>();
  //selectStateObservable: Observable<string>;
  constructor() {
    /*

    this.loginState = new BehaviorSubject<any>('None');
    this.loginStateObservable = this.loginState.asObservable();
    this.selectState = new BehaviorSubject<string>('main');
    this.selectStateObservable = this.selectState.asObservable();
    */
   
  }

  sendLoginState(status : string){
    this.loginState.next(status);
  }

  getLoginState(): Observable<string>{ 
    return this.loginState.asObservable();
  }

  sendSelectMenu(selected:string){ 
    this.selectState.next(selected);
  }
  
  getSelectMenuEvent(): Observable<string>{ 
    return this.selectState.asObservable();
  }

  sendAlertEvent(e : any) {
    this.alertMessage.next(e);
  }

  getAlertEvent(): Observable<any>{ 
    return this.alertMessage.asObservable();
  }
}