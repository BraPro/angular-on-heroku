import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { ViewContainerRef, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { PassValidator } from '../validators/pass-validators';
import { PassMatchValidator } from '../validators/passmatch-validators';
let AccountComponent = class AccountComponent {
    constructor(formBuilder, 
    //private route: ActivatedRoute,
    router, modalService, componentFactoryResolver, sharedService
    //private authenticationService: AuthenticationService,
    //private alertService: AlertService
    ) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.modalService = modalService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.sharedService = sharedService;
        this.title = 'Account';
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
        ;
        this.modalService.open(id);
    }
    closeModal(id) {
        this.modalService.close(id);
    }
    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            username: ['', { validators: [Validators.required, Validators.email], updateOn: 'change' }],
            password: ['', { validators: [Validators.required, PassValidator.patternValidator], updateOn: 'change' }],
            cpassword: ['', { validators: [Validators.required], updateOn: 'change' }]
        }, {
            validator: PassMatchValidator.passwordMatchValidator('password', 'cpassword')
        });
        // get return url from route parameters or default to '/'
        //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    isFieldValid(field) {
        return ((!this.registerForm.get(field).valid && this.registerForm.get(field).touched) ||
            (this.registerForm.get(field).untouched && this.submitted));
    }
    displayFieldCss(field) {
        if (this.registerForm.get(field).pristine || this.registerForm.get(field).untouched) {
            return;
        }
        this.check = this.isFieldValid(field);
        return {
            'form-group': true,
            'has-error': this.check,
            'has-success': !this.check
        };
    }
    get f() { return this.registerForm.controls; }
    geterror(field) {
        if (field == 'cpassword' && this.registerForm.get(field).touched) {
            if (this.registerForm.controls['cpassword'].hasError('NoPassswordMatch')) {
                return "Password does't match!";
            }
            return "Please valid password";
        }
        if (field == 'password' && this.registerForm.get(field).touched) {
            if (this.registerForm.controls['password'].hasError('minlength')) {
                return "Minimun length is 6!";
            }
            else if (this.registerForm.controls['password'].hasError('NoUppercaseCharacter')) {
                return "Enter Upper case Character!";
            }
            else if (this.registerForm.controls['password'].hasError('NoLowercaseCharacter')) {
                return "Enter Lower case Character!";
            }
            else if (this.registerForm.controls['password'].hasError('NoNumberCharacter')) {
                return "Enter Number case Character!";
            }
            else if (this.registerForm.controls['password'].hasError('NoSpecialCharacter')) {
                return "Enter Special case Character!";
            }
        }
        return "Please enter password";
    }
    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        //this.validateAllFormFields(this.registerForm);
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
        this.registerForm.reset();
        this.submitted = false;
    }
};
__decorate([
    ViewChild("EmailForgot", { read: ViewContainerRef })
], AccountComponent.prototype, "container", void 0);
__decorate([
    ViewChild("Alert", { read: ViewContainerRef })
], AccountComponent.prototype, "alertContainer", void 0);
AccountComponent = __decorate([
    Component({
        selector: 'app-account',
        templateUrl: './account.component.html',
        styleUrls: ['./account.component.css']
    })
], AccountComponent);
export { AccountComponent };
//# sourceMappingURL=account.component.js.map