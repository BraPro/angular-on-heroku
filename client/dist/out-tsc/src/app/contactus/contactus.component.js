import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
let ContactusComponent = class ContactusComponent {
    constructor(formBuilder, 
    //private route: ActivatedRoute,
    router) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.title = 'contactus';
        this.loading = false;
        this.submitted = false;
        // redirect to home if already logged in
        //if (this.authenticationService.currentUserValue) { 
        //    this.router.navigate(['/']);
        //}
    }
    ngOnInit() {
        this.contactusForm = this.formBuilder.group({
            name: ['', { validators: [Validators.required], updateOn: 'change' }],
            email: ['', { validators: [Validators.required, Validators.email, Validators.maxLength(32)], updateOn: 'change' }],
            subject: ['', { validators: [Validators.required], updateOn: 'change' }],
            comment: ['', { validators: [Validators.required, Validators.maxLength(2000)], updateOn: 'change' }]
        });
        // get return url from route parameters or default to '/'
        //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    isFieldValid(field) {
        return ((!this.contactusForm.get(field).valid && this.contactusForm.get(field).touched) ||
            (this.contactusForm.get(field).untouched && this.submitted));
    }
    displayFieldCss(field) {
        if (this.contactusForm.get(field).pristine) {
            return;
        }
        return {
            'form-group': true,
            'has-error': this.isFieldValid(field),
            'has-success': !this.isFieldValid(field)
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
        this.contactusForm.reset();
        this.submitted = false;
    }
};
ContactusComponent = __decorate([
    Component({
        selector: 'app-contactus',
        templateUrl: './contactus.component.html',
        styleUrls: ['./contactus.component.css']
    })
], ContactusComponent);
export { ContactusComponent };
//# sourceMappingURL=contactus.component.js.map