import { __decorate } from "tslib";
import { Component, ViewContainerRef, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { PassValidator } from '../validators/pass-validators';
import { ForgotPasswordComponent } from './forgotpassword.component';
let LoginComponent = class LoginComponent {
    constructor(formBuilder, 
    //private route: ActivatedRoute,
    modalService, componentFactoryResolver, sharedService
    //private authenticationService: AuthenticationService,
    //private alertService: AlertService
    ) {
        this.formBuilder = formBuilder;
        this.modalService = modalService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.sharedService = sharedService;
        this.title = 'Login';
        this.loading = false;
        this.submitted = false;
        // redirect to home if already logged in
        //if (this.authenticationService.currentUserValue) { 
        //    this.router.navigate(['/']);
        //}
    }
    openModal2(id) {
        this.sharedService.sendClickEvent({ 'res': 'error', 'msg': "abc" });
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
    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', { validators: [Validators.required, Validators.email], updateOn: 'change' }],
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
        //this.validateAllFormFields(this.loginForm);
        this.loading = true;
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