import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let EmployeeService = class EmployeeService {
    constructor(http) {
        this.http = http;
    }
    getAll() {
        return this.http.get(`api/employees`);
    }
    getById(id) {
        return this.http.get(`api/employees/${id}`);
    }
    ///////////////////////////////////
    getFullById(id) {
        return this.http.get(`api/employees/${id}/full`);
    }
    getManagerById(id) {
        return this.http.get(`api/employees/${id}/manager`);
    }
    getGarageById(id) {
        return this.http.get(`api/employees/${id}/garage`);
    }
    ///////////////////////////////////
    register(emp) {
        return this.http.post(`api/employees/register`, emp);
    }
    update(emp) {
        return this.http.put(`api/employees/${emp.id}`, emp);
    }
    delete(id) {
        return this.http.delete(`api/employees/${id}`);
    }
};
EmployeeService = __decorate([
    Injectable({ providedIn: 'root' })
], EmployeeService);
export { EmployeeService };
//# sourceMappingURL=employee.services.js.map