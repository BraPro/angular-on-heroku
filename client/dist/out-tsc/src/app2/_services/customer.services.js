import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let CustomerService = class CustomerService {
    constructor(http) {
        this.http = http;
    }
    getAll() {
        return this.http.get(`api/customers`);
    }
    getById(id) {
        return this.http.get(`api/customers/${id}`);
    }
    ///////////////////////////////////
    getFullById(id) {
        return this.http.get(`api/customers/${id}/full`);
    }
    getCarsById(id) {
        return this.http.get(`api/customers/${id}/cars`);
    }
    getTtreatmentsById(id) {
        return this.http.get(`api/customers/${id}/treatments`);
    }
    ///////////////////////////////////
    add(customer) {
        return this.http.post(`api/customers/add`, customer);
    }
    update(customer) {
        return this.http.put(`api/customers/${customer.id}`, customer);
    }
    delete(id) {
        return this.http.delete(`api/customers/${id}`);
    }
};
CustomerService = __decorate([
    Injectable({ providedIn: 'root' })
], CustomerService);
export { CustomerService };
//# sourceMappingURL=customer.services.js.map