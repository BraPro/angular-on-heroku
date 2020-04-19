import { Component, OnInit ,NgModule  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, ControlContainer } from '@angular/forms';
import { PassValidator } from '../validators/pass-validators'
import { PassMatchValidator } from '../validators/passmatch-validators'




@Component({
	selector: 'app-contactus',
	templateUrl: './contactus.component.html',
	styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
	title = 'contactus';
	contactusForm: FormGroup;
    loading = false;
	submitted = false;
	returnUrl: string;
	errormsg:string;
	
	constructor(
        private formBuilder: FormBuilder,
        //private route: ActivatedRoute,
		private router: Router,
		
        //private authenticationService: AuthenticationService,
        //private alertService: AlertService
    ) {
        // redirect to home if already logged in
        //if (this.authenticationService.currentUserValue) { 
        //    this.router.navigate(['/']);
        //}
	}
	
	ngOnInit() {
		
		this.contactusForm = this.formBuilder.group({
			name: ['', { validators:  [ Validators.required], updateOn:'change'}],
			email: ['',{ validators:  [ Validators.required,Validators.email, Validators.maxLength(32)], updateOn:'change'}],
			subject:['',{validators: [ Validators.required], updateOn:'change'}],
			comment:['',{validators: [Validators.required, Validators.maxLength(2000)], updateOn:'change'}]
	    });
		// get return url from route parameters or default to '/'
		//this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
	}

	isFieldValid(field: string) {
		return (
			(!this.contactusForm.get(field).valid && this.contactusForm.get(field).touched) ||
			(this.contactusForm.get(field).untouched && this.submitted)
		);
	  }
	
	displayFieldCss(field: string) {
		if(this.contactusForm.get(field).pristine){
			return;
		}
		return {
			'form-group': true,
			'has-error': this.isFieldValid(field),
			'has-success' : !this.isFieldValid(field)
		};
	}
	
	  
	get f() { return this.contactusForm.controls; }

	onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.contactusForm.invalid) {
            return;
        }

		//this.validateAllFormFields(this.contactusForm);
		this.loading = true;
		/*
        this.authenticationService.register(this.f.username.value, this.f.password.value)
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
		this.contactusForm.reset();
		this.submitted = false;
	  }
}
