import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let GarageService = class GarageService {
    constructor(http) {
        this.http = http;
    }
    getAll() {
        return this.http.get(`api/garages`);
    }
    getById(id) {
        return this.http.get(`api/garages/${id}`);
    }
    ///////////////////////////////////
    getFullById(id) {
        return this.http.get(`api/garages/${id}/full`);
    }
    getManagerById(id) {
        return this.http.get(`api/garages/${id}/manager`);
    }
    getEmployeesById(id) {
        return this.http.get(`api/garages/${id}/employees`);
    }
    getTreatmentsById(id) {
        return this.http.get(`api/garages/${id}/treatments`);
    }
    ///////////////////////////////////
    add(garage) {
        return this.http.post(`api/garages/add`, garage);
    }
    update(garage) {
        return this.http.put(`api/garages/${garage._id}`, garage);
    }
    delete(id) {
        return this.http.delete(`api/garages/${id}`);
    }
};
GarageService = __decorate([
    Injectable({ providedIn: 'root' })
], GarageService);
export { GarageService };
//# sourceMappingURL=garage.services.js.map