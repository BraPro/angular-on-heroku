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
    getGaragesById(id) {
        return this.http.get(`api/managers/${id}/garages`);
    }
    ///////////////////////////////////
    add(manager) {
        return this.http.post(`api/managers/add`, manager);
    }
    update(manager) {
        return this.http.put(`api/managers/${manager.id}`, manager);
    }
    delete(id) {
        return this.http.delete(`api/managers/${id}`);
    }
};
ManagerService = __decorate([
    Injectable({ providedIn: 'root' })
], ManagerService);
export { ManagerService };
//# sourceMappingURL=manager.services.js.map