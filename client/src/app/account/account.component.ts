import { Component, OnInit ,NgModule,Input  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, ControlContainer } from '@angular/forms';
import { PassValidator } from '../validators/pass-validators'
import { PassMatchValidator } from '../validators/passmatch-validators'

import { first } from 'rxjs/operators';
import { UserService } from '../_services';
import { SharedService } from './../shared/shared.service';
import { Employee } from '@app/_models';
import { EmployeeService } from '@app/_services/employee.services';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit {
	title = 'account';
	accountForm: FormGroup;
	user: Employee;
	loading = false;
	submitted = false;
	check = false;
	constructor(
    private formBuilder: FormBuilder,
        //private route: ActivatedRoute,
		private router: Router,
		private userService : UserService,
		private employeeService : EmployeeService,
		private sharedService:SharedService
        //private authenticationService: AuthenticationService,
        //private alertService: AlertService
    ) {
		this.user = this.userService.currentUserValue;
        // redirect to home if already logged in
        //if (this.authenticationService.currentUserValue) { 
        //    this.router.navigate(['/']);
        //}
	}
	
	ngOnInit() {
		
		this.accountForm = this.formBuilder.group({
			_id: ['', {validators: [ Validators.required], updateOn:'change'}],
			firstname: ['', {validators: [ Validators.required], updateOn:'change'}],
			lastname: ['', {validators: [ Validators.required], updateOn:'change'}],
			email: ['', {validators: [ Validators.required,Validators.email], updateOn:'change'}]
			//password: ['', {validators: [ Validators.required,PassValidator.patternValidator], updateOn:'change'}],
			//cpassword:['', {validators: [ Validators.required], updateOn:'change'}]},{ 
		    //validator: PassMatchValidator.passwordMatchValidator('password','cpassword',)
	    });
		// get return url from route parameters or default to '/'
		//this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
	}


	  isFieldValid(field: string) {
		return (
			(!this.accountForm.get(field).valid && this.accountForm.get(field).touched) ||
			(this.accountForm.get(field).untouched && this.submitted)
		);
	  }
	
	  displayFieldCss(field: string) {
		  //return true;
		if ((this.accountForm.get(field)) && (this.accountForm.get(field).pristine || this.accountForm.get(field).untouched)){
			return;
		}

		this.check = this.isFieldValid(field);
		return {
			'form-group': true,
			'has-error': this.check,
			'has-success' : !this.check
		};
	}
	
	geterror(field: string) {
        if(field =='cpassword' && this.accountForm.get(field).touched){
			if(this.accountForm.controls['cpassword'].hasError('NoPassswordMatch')){
				return "Password does't match!";
			}
			
			return "Please valid password";
		}

		if(field =='password' && this.accountForm.get(field).touched){
			if(this.accountForm.controls['password'].hasError('minlength')){
				return "Minimun length is 6!";
			}else if(this.accountForm.controls['password'].hasError('NoUppercaseCharacter')){
				return "Enter Upper case Character!";
			}else if(this.accountForm.controls['password'].hasError('NoLowercaseCharacter')){
				return "Enter Lower case Character!";
			}else if(this.accountForm.controls['password'].hasError('NoNumberCharacter')){
				return "Enter Number case Character!";
			}else if(this.accountForm.controls['password'].hasError('NoSpecialCharacter')){
				return "Enter Special case Character!";
			}}

			return "Please enter password";	
	}

	onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.accountForm.invalid) {
            return;
        }
		if(this.loading){
			return;
		}

		//this.validateAllFormFields(this.registerForm);
		this.loading = true;
		this.employeeService.update(this.accountForm.value)
		.pipe(first())
		.subscribe(
			data => {
				//this.alertService.success('Registration successful', true);
				this.sharedService.sendAlertEvent(data);
				//if(data.response == 'Success'){
					//setTimeout(() => {  this.router.navigate(['/login']); }, 1000);
				//}
			},
			error => {
				//this.alertService.error(error);
				this.sharedService.sendAlertEvent({response: 'Error', msg: 'Check your internet connection'});
			},
			() => {
				this.loading = false;
			});
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
		this.accountForm.reset();
		this.submitted = false;
	  }
}
