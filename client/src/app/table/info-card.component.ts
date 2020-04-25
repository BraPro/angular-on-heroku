import {Component, OnInit, ViewChild} from '@angular/core';
import { UserService } from '@app/_services';
import { Employee } from '@app/_models';


@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.css'],
})
export class InfoCardComponent implements OnInit {
  user: Employee;
  constructor(
		private userService : UserService
    ) {
		this.user = this.userService.currentUserValue;
	}
	ngOnInit() {}

  }
