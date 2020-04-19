import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, NgModelGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component, OnDestroy, OnInit, Input, EventEmitter, Output, ElementRef } from '@angular/core';

@Component({
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.css']
})

export class AlertComponent implements OnInit {
	//alertComponent: ReactiveFormsModule;

    submitted = false;
	returnUrl: string;

	visibility = 'visible';
	@Output() output = new EventEmitter();
	@Output() end = new EventEmitter();

	@Input() altRes : string;
	@Input() altMessage : string;
	@Output() inputSliderValueChange: EventEmitter<string> = new EventEmitter<string>();

    private element: any;

	constructor(
		private host: ElementRef<HTMLElement>,
        private formBuilder: FormBuilder,
        //private route: ActivatedRoute,
		private router: Router,
		private el: ElementRef
        //private authenticationService: AuthenticationService,
        //private alertService: AlertService
    ) {
        // redirect to home if already logged in
        //if (this.authenticationService.currentUserValue) { 
        //    this.router.navigate(['/']);
		//}
		this.element = el.nativeElement;
		//console.log(viewContainerRef);

		//	$('#AltRes').text(data.response);
	//$('#AltMSG').text(data.msg);
	}

	ngOnInit() {
		let modal = this;
		// get return url from route parameters or default to '/'
		//this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
	}
}
