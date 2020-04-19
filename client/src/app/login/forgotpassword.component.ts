import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnDestroy, OnInit, Input, EventEmitter, Output, ElementRef } from '@angular/core';
//import { trigger, style, animate, transition, state } from '@angular/animations';

import { first } from 'rxjs/operators';
import { UserService } from '../_services';
import { SharedService } from './../shared/shared.service';

@Component({
	templateUrl: './forgotpassword.component.html',
	styleUrls: ['./forgotpassword.component.css'],
})

export class ForgotPasswordComponent implements OnInit {
	forgotPasswordForm: FormGroup;
    loading = false;
    submitted = false;
	returnUrl: string;

	visibility = 'visible';
	@Output() output = new EventEmitter();
	@Output() end = new EventEmitter();

	@Input() id: string;
    private element: any;

	constructor(
		private host: ElementRef<HTMLElement>,
        private formBuilder: FormBuilder,
        //private route: ActivatedRoute,
		private router: Router,
		private el: ElementRef,
		private userService : UserService,
		private sharedService:SharedService
        //private authenticationService: AuthenticationService,
        //private alertService: AlertService
    ) {
        // redirect to home if already logged in
        //if (this.authenticationService.currentUserValue) { 
        //    this.router.navigate(['/']);
		//}
		this.element = el.nativeElement;
		//console.log(viewContainerRef);
	}

	ngOnInit() {
		let modal = this;

		this.forgotPasswordForm = this.formBuilder.group({
			
			email: ['', {validators: [ Validators.required, Validators.email, Validators.maxLength(32)], updateOn:'change'}],
		});
		// get return url from route parameters or default to '/'
		//this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
	}

	isFieldValid(field: string) {
		return (
			(!this.forgotPasswordForm.get(field).valid && this.forgotPasswordForm.get(field).touched) ||
			(this.forgotPasswordForm.get(field).untouched && this.submitted)
		);
	  }
	
	displayFieldCss(field: string) {
		if(this.forgotPasswordForm.get(field).pristine){
			return;
		}
		return {
			'form-group': true,
			'has-error': this.isFieldValid(field),
			'has-success' : !this.isFieldValid(field)
		};
	}

	onSubmit() {
		this.submitted = true;
        // stop here if form is invalid
        if (this.forgotPasswordForm.invalid) {
            return;
        }

		//this.validateAllFormFields(this.loginForm);
		if(this.loading){
			return;
		}

		//this.validateAllFormFields(this.loginForm);
		this.loading = true;
		this.userService.forgotPassword(this.forgotPasswordForm.value)
		.pipe(first())
		.subscribe(
			data => {
				//this.alertService.success('Registration successful', true);
				this.sharedService.sendClickEvent(data);
				if(data.response == 'Success'){
					setTimeout(() => {  this.router.navigate(['/login']); }, 1000);
				}
			},
			error => {
				//this.alertService.error(error);
				this.sharedService.sendClickEvent({response: 'Error', msg: 'Check your internet connection'});
				
			},
			() => {
				this.loading = false;
			});
		/*
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
				});
				
		*/
	}
	
	validateAllFormFields(formGroup: FormGroup) {
		Object.keys(formGroup.controls).forEach(field => {
		  console.log(field);
		  const control = formGroup.get(field);
		  if (control instanceof FormControl) {
			control.markAsTouched({ onlySelf: true });
		  } else if (control instanceof FormGroup) {
			this.validateAllFormFields(control);
		  }
		});
	  }
	  
	reset() {
		this.forgotPasswordForm.reset();
		this.submitted = false;
	  }
}
