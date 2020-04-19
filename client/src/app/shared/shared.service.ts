import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SharedService {
  private subject = new Subject<any>();
  
  loginState: BehaviorSubject<string>;
  loginStateObservable: Observable<string>;
  selectState: BehaviorSubject<string>;
  selectStateObservable: Observable<string>;

  constructor() {
    this.loginState = new BehaviorSubject<string>('loggedout');
    this.loginStateObservable = this.loginState.asObservable();
    this.selectState = new BehaviorSubject<string>('main');
    this.selectStateObservable = this.selectState.asObservable();
  }

  loginUser(permission:boolean) {
    if(permission){
     this.loginState.next("admin");}
    else{
     this.loginState.next("employee");}

  }

  selectMenu(selected:string){ 
    this.selectState.next(selected);
  }
  
  sendClickEvent(e : any) {
    this.subject.next(e);
  }

  getClickEvent(): Observable<any>{ 
    return this.subject.asObservable();
  }
  


  
}