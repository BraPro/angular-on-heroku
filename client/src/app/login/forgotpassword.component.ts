import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output, ElementRef } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserService } from '@app/_services';
import { SharedService } from '@app/shared/shared.service';

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

	constructor(private formBuilder: FormBuilder,
		private router: Router,
		private el: ElementRef,
		private userService : UserService,
		private sharedService:SharedService
    ) {
		this.element = el.nativeElement;
	}

	ngOnInit() {
		this.forgotPasswordForm = this.formBuilder.group({
			email: ['', {validators: [ Validators.required, Validators.email, Validators.maxLength(32)], updateOn:'change'}],
		});
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
        if (this.forgotPasswordForm.invalid) {
            return;
		}
		
		if(this.loading){
			return;
		}

		this.loading = true;
		this.userService.forgotPassword(this.forgotPasswordForm.value)
		.pipe(first())
		.subscribe(
			data => {
				//this.alertService.success('Registration successful', true);
				this.sharedService.sendAlertEvent(data);
				if(data.response == 'Success'){
					setTimeout(() => {  this.router.navigate(['/login']); }, 1000);
				}
			},
			() => {
				this.loading = false;
		});
	}
	
	validateAllFormFields(formGroup: FormGroup) {
		Object.keys(formGroup.controls).forEach(field => {
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
