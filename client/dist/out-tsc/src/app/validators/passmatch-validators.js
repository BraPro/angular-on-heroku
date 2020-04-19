var PassMatchValidator_1;
import { __decorate } from "tslib";
import { NG_VALIDATORS } from '@angular/forms';
import { Directive } from '@angular/core';
let PassMatchValidator = PassMatchValidator_1 = class PassMatchValidator {
    // custom validator to check that two fields match
    static passwordMatchValidator(Passcontrol, Cpasscontrol) {
        return (formGroup) => {
            const control = formGroup.controls[Passcontrol];
            const matchingControl = formGroup.controls[Cpasscontrol];
            if (matchingControl.errors && !matchingControl.errors.passwordMatchValidator) {
                // return if another validator has already found an error on the matchingControl
                return;
            }
            // set error on matchingControl if validation fails
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ NoPassswordMatch: true });
            }
            else {
                matchingControl.setErrors(null);
            }
        };
    }
};
PassMatchValidator = PassMatchValidator_1 = __decorate([
    Directive({
        selector: '[validpassword]',
        providers: [
            { provide: NG_VALIDATORS, useExisting: PassMatchValidator_1, multi: true }
        ]
    })
], PassMatchValidator);
export { PassMatchValidator };
//# sourceMappingURL=passmatch-validators.js.map