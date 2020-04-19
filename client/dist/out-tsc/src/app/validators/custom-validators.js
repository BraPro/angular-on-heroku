export class CustomValidators {
    static patternValidator(control) {
        const password = control.get('password').value; // get password from our password form control
        if (!password.match(/^(?=.*[A-Z])/)) { //Must Include an Uppercase Character
            control.get('password').setErrors({ NoUppercaseCharacter: true });
        }
        else if (!password.match(/^(?=.*[a-z])/)) { //Must Include an Lowercase Character
            control.get('password').setErrors({ NoLowercaseCharacter: true });
        }
        else if (!password.match(/^(?=.*\d)/)) { //Must Include a Number
            control.get('password').setErrors({ NoNumberCharacter: true });
        }
        else if (!password.match(/^(?=.*[-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#])/)) { //Must Include a Special Character (!, @, #, etc.)
            control.get('password').setErrors({ NoSpecialCharacter: true });
        }
    }
    static passwordMatchValidator(control) {
        const password = control.get('password').value; // get password from our password form control
        const confirmPassword = control.get('cpassword').value; // get password from our confirmPassword form control
        // compare is the password math
        if (password !== confirmPassword) {
            // if they don't match, set an error in our confirmPassword form control
            control.get('cpassword').setErrors({ NoPassswordMatch: true });
        }
        return null;
    }
}
//# sourceMappingURL=custom-validators.js.map