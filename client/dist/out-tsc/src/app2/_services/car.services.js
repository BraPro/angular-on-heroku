import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let CarService = class CarService {
    constructor(http) {
        this.http = http;
    }
    getAll() {
        return this.http.get(`api/cars`);
    }
    getById(id) {
        return this.http.get(`api/cars/${id}`);
    }
    ///////////////////////////////////
    getFullById(id) {
        return this.http.get(`api/cars/${id}/full`);
    }
    getCustomersById(id) {
        return this.http.get(`api/cars/${id}/customers`);
    }
    getTtreatmentById(id) {
        return this.http.get(`api/cars/${id}/treatment`);
    }
    ///////////////////////////////////
    add(car) {
        return this.http.post(`api/cars/add`, car);
    }
    update(car) {
        return this.http.put(`api/cars/${car.id}`, car);
    }
    delete(id) {
        return this.http.delete(`api/cars/${id}`);
    }
};
CarService = __decorate([
    Injectable({ providedIn: 'root' })
], CarService);
export { CarService };
//# sourceMappingURL=car.services.js.map