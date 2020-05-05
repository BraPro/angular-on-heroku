import {Component, OnInit, ViewChild} from '@angular/core';
import { UserService } from '@app/_services';
import { Employee } from '@app/_models';
import { SharedService } from '@app/shared/shared.service';


@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.css'],
})
export class InfoCardComponent implements OnInit {
  user: Employee; 
  permission: string;  //'New Employee','Employee', 'Manager', 'Admin', 'None'


  constructor(private userService : UserService , private _loginService: SharedService) {
    this.user = this.userService.currentUserValue;
    this._loginService.loginStateObservable.subscribe(res => {
      this.permission = res;
    })
  }
	ngOnInit() {
  }

  }
