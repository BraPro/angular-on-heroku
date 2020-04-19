import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
let LoginComponent = class LoginComponent {
    constructor(formBuilder, 
    //private route: ActivatedRoute,
    router) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.title = 'Login';
        this.loading = false;
        this.submitted = false;
        // redirect to home if already logged in
        //if (this.authenticationService.currentUserValue) { 
        //    this.router.navigate(['/']);
        //}
    }
    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', { validators: [Validators.required, Validators.pattern('/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/')], updateOn: 'change' }],
            password: ['', { validators: [Validators.required, Validators.minLength(6)], updateOn: 'change' }]
        });
        // get return url from route parameters or default to '/'
        //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    isFieldValid(field) {
        return ((!this.loginForm.get(field).valid && this.loginForm.get(field).touched) ||
            (this.loginForm.get(field).untouched && this.submitted));
    }
    displayFieldCss(field) {
        this.loginForm.get(field).pristine;
        return {
            'form-group has-error': this.isFieldValid(field),
            'form-group has-success': !this.isFieldValid(field)
        };
    }
    get f() { return this.loginForm.controls; }
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
LoginComponent = __decorate([
    Component({
        selector: 'app-root',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map