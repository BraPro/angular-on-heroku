import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let UserService = class UserService {
    constructor(http) {
        this.http = http;
    }
    signup(e) {
        return this.http.post(`api/users/signup`, e);
    }
    forgotPassword(e) {
        return this.http.post(`api/users/forgotpassword`, e);
    }
    login(e) {
        return this.http.post(`api/users/login`, e);
    }
    logout() {
        return this.http.post(`api/users/logout`, '');
    }
};
UserService = __decorate([
    Injectable({ providedIn: 'root' })
], UserService);
export { UserService };
//# sourceMappingURL=user.services.js.map