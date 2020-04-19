var PassValidator_1;
import { __decorate } from "tslib";
import { NG_VALIDATORS } from '@angular/forms';
import { Directive } from '@angular/core';
let PassValidator = PassValidator_1 = class PassValidator {
    validate(c) {
        return PassValidator_1.patternValidator(c);
    }
    static patternValidator(control) {
        if (control.value.match(/^$/)) { //must not be empty 
            return { minlength: false };
        }
        else if (control.value.length < 6) { //Must have an minimum of 6 characters                                                     
            return { minlength: true };
        }
        else if (!control.value.match(/^(?=.*[A-Z])/)) { //Must Include an Uppercase Character
            return { NoUppercaseCharacter: true };
        }
        else if (!control.value.match(/^(?=.*[a-z])/)) { //Must Include an Lowercase Character
            return { NoLowercaseCharacter: true };
        }
        else if (!control.value.match(/^(?=.*\d)/)) { //Must Include a Number
            return { NoNumberCharacter: true };
        }
        else if (!control.value.match(/^(?=.*[-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#])/)) { //Must Include a Special Character (!, @, #, etc.)
            return { NoSpecialCharacter: true };
        }
        return null;
    }
};
PassValidator = PassValidator_1 = __decorate([
    Directive({
        selector: '[validpassword]',
        providers: [
            { provide: NG_VALIDATORS, useExisting: PassValidator_1, multi: true }
        ]
    })
], PassValidator);
export { PassValidator };
//# sourceMappingURL=pass-validators.js.map