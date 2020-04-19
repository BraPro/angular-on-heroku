import { __decorate } from "tslib";
import { Component, ViewContainerRef, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { PassValidator } from '../validators/pass-validators';
import { ForgotPasswordComponent } from './forgotpassword.component';
import { first } from 'rxjs/operators';
let LoginComponent = class LoginComponent {
    constructor(formBuilder, 
    //private route: ActivatedRoute,
    router, modalService, componentFactoryResolver, userService, sharedService
    //private authenticationService: AuthenticationService,
    //private alertService: AlertService
    ) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.modalService = modalService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.userService = userService;
        this.sharedService = sharedService;
        this.title = 'Login';
        this.loading = false;
        this.submitted = false;
        this.passType = 'password';
        // redirect to home if already logged in
        //if (this.authenticationService.currentUserValue) { 
        //    this.router.navigate(['/']);
        //}
    }
    openModal(id) {
        this.componentRef && this.componentRef.destroy();
        const factory = this.componentFactoryResolver.resolveComponentFactory(ForgotPasswordComponent);
        this.componentRef = this.container.createComponent(factory);
        this.modalService.open(id);
    }
    closeModal(id) {
        this.modalService.close(id);
    }
    showPassword() {
        if (this.passType == 'text') {
            this.passType = 'password';
        }
        else {
            this.passType = 'text';
        }
    }
    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', { validators: [Validators.required, Validators.email], updateOn: 'change' }],
            password: ['', { validators: [Validators.required, PassValidator.patternValidator], updateOn: 'change' }]
        });
        // get return url from route parameters or default to '/'
        //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    isFieldValid(field) {
        return ((!this.loginForm.get(field).valid && this.loginForm.get(field).touched) ||
            (this.loginForm.get(field).untouched && this.submitted));
    }
    displayFieldCss(field) {
        if (this.loginForm.get(field).pristine) {
            return;
        }
        return {
            'form-group': true,
            'has-error': this.isFieldValid(field),
            'has-success': !this.isFieldValid(field)
        };
    }
    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        if (this.loading) {
            return;
        }
        //this.validateAllFormFields(this.loginForm);
        this.loading = true;
        this.userService.login(this.loginForm.value)
            .pipe(first())
            .subscribe(data => {
            //this.alertService.success('Registration successful', true);
            this.sharedService.sendClickEvent(data);
            if (data.response == 'Success') {
                setTimeout(() => { this.router.navigate(['/balagannn']); }, 1000);
            }
        }, error => {
            //this.alertService.error(error);
            this.sharedService.sendClickEvent({ response: 'Error', msg: 'Check your internet connection' });
        }, () => {
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
    validateAllFormFields(formGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            console.log(field);
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            }
            else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }
    reset() {
        this.loginForm.reset();
        this.submitted = false;
    }
};
__decorate([
    ViewChild("EmailForgot", { read: ViewContainerRef })
], LoginComponent.prototype, "container", void 0);
__decorate([
    ViewChild("Alert", { read: ViewContainerRef })
], LoginComponent.prototype, "alertContainer", void 0);
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map