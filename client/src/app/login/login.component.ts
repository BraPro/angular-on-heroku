import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, ComponentFactory, ComponentRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PassValidator } from '../validators/pass-validators'
import { ModalService } from '../_modal';
import { ForgotPasswordComponent } from './forgotpassword.component';
import { first } from 'rxjs/operators';
import { UserService } from '../_services';
import { SharedService } from './../shared/shared.service';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	title = 'Login';
	loginForm: FormGroup;
    loading = false;
    submitted = false;
	returnUrl: string;
	permission: boolean = true;
	
	@ViewChild("EmailForgot", { read: ViewContainerRef }) container;
	@ViewChild("Alert", { read: ViewContainerRef }) alertContainer;
	componentRef: ComponentRef<any>;
	passType: string = 'password';

	

	constructor(
        private formBuilder: FormBuilder,
        //private route: ActivatedRoute,
		private router: Router,
		private modalService: ModalService,
		private componentFactoryResolver: ComponentFactoryResolver,
		
		private userService : UserService,
		private sharedService:SharedService,
        //private authenticationService: AuthenticationService,
        //private alertService: AlertService
    ) {
        // redirect to home if already logged in
        //if (this.authenticationService.currentUserValue) { 
        //    this.router.navigate(['/']);
        //}
	}
	
	openModal(id: string) {
		this.componentRef && this.componentRef.destroy();
		const factory: ComponentFactory<any> = this.componentFactoryResolver.resolveComponentFactory(ForgotPasswordComponent);
		this.componentRef = this.container.createComponent(factory);
		this.modalService.open(id);
    }

    closeModal(id: string) {
        this.modalService.close(id);
	}
	
	showPassword() {
		if(this.passType == 'text'){
			this.passType = 'password';
		}else{
			this.passType = 'text';
		}
	}

	ngOnInit() {
		this.loginForm = this.formBuilder.group({
			email: ['', {validators: [ Validators.required, Validators.email], updateOn:'change'}],
			password: ['', {validators: [ Validators.required, PassValidator.patternValidator], updateOn:'change'}]
		});
		// get return url from route parameters or default to '/'
		//this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
	}

	isFieldValid(field: string) {
		return (
			(!this.loginForm.get(field).valid && this.loginForm.get(field).touched) ||
			(this.loginForm.get(field).untouched && this.submitted)
		);
	  }
	
	displayFieldCss(field: string) {
		if(this.loginForm.get(field).pristine){
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
		this.FilterbyPermission(this.permission);

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
		}
		if(this.loading){
			return;
		}

		//this.validateAllFormFields(this.loginForm);
		this.loading = true;
		this.userService.login(this.loginForm.value)
		.pipe(first())
		.subscribe(
			data => {
				//this.alertService.success('Registration successful', true);
				this.sharedService.sendClickEvent(data);
				if(data.response == 'Success'){

					setTimeout(() => {  this.router.navigate(['/main']); }, 1000);
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
		this.loginForm.reset();
		this.submitted = false;
	  }

	  FilterbyPermission(permission:boolean){
		this.sharedService.loginUser(permission);
		setTimeout(() => {  this.router.navigate(['/main']); }, 1000);
	  };
}
