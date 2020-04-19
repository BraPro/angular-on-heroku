import { __decorate } from "tslib";
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, Input, EventEmitter, Output } from '@angular/core';
//import { trigger, style, animate, transition, state } from '@angular/animations';
let ForgotPasswordComponent = class ForgotPasswordComponent {
    constructor(host, formBuilder, 
    //private route: ActivatedRoute,
    router, el
    //private authenticationService: AuthenticationService,
    //private alertService: AlertService
    ) {
        this.host = host;
        this.formBuilder = formBuilder;
        this.router = router;
        this.el = el;
        this.loading = false;
        this.submitted = false;
        this.visibility = 'visible';
        this.output = new EventEmitter();
        this.end = new EventEmitter();
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
            username: ['', { validators: [Validators.required, Validators.email, Validators.maxLength(32)], updateOn: 'change' }],
            password: ['', { validators: [Validators.required, Validators.minLength(6), Validators.maxLength(32)], updateOn: 'change' }]
        });
        // get return url from route parameters or default to '/'
        //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    isFieldValid(field) {
        return ((!this.forgotPasswordForm.get(field).valid && this.forgotPasswordForm.get(field).touched) ||
            (this.forgotPasswordForm.get(field).untouched && this.submitted));
    }
    displayFieldCss(field) {
        if (this.forgotPasswordForm.get(field).pristine) {
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
        if (this.forgotPasswordForm.invalid) {
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
        this.forgotPasswordForm.reset();
        this.submitted = false;
    }
};
__decorate([
    Output()
], ForgotPasswordComponent.prototype, "output", void 0);
__decorate([
    Output()
], ForgotPasswordComponent.prototype, "end", void 0);
__decorate([
    Input()
], ForgotPasswordComponent.prototype, "id", void 0);
ForgotPasswordComponent = __decorate([
    Component({
        templateUrl: './forgotpassword.component.html',
        styleUrls: ['./forgotpassword.component.css'],
    })
], ForgotPasswordComponent);
export { ForgotPasswordComponent };
//# sourceMappingURL=forgotpassword.component.js.map