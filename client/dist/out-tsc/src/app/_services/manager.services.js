import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let ManagerService = class ManagerService {
    constructor(http) {
        this.http = http;
    }
    getAll() {
        return this.http.get(`api/managers`);
    }
    getById(id) {
        return this.http.get(`api/managers/${id}`);
    }
    ///////////////////////////////////
    getFullById(id) {
        return this.http.get(`api/managers/${id}/full`);
    }
    getEmployeesById(id) {
        return this.http.get(`api/managers/${id}/employees`);
    }
};
ManagerService = __decorate([
    Injectable({ providedIn: 'root' })
], ManagerService);
export { ManagerService };
//# sourceMappingURL=manager.services.js.map