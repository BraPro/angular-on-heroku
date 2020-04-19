import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let TreatmentService = class TreatmentService {
    constructor(http) {
        this.http = http;
    }
    getAll() {
        return this.http.get(`api/treatments`);
    }
    getById(id) {
        return this.http.get(`api/treatments/${id}`);
    }
    ///////////////////////////////////
    getFullById(id) {
        return this.http.get(`api/treatments/${id}/full`);
    }
    getGarageById(id) {
        return this.http.get(`api/treatments/${id}/garage`);
    }
    getCarById(id) {
        return this.http.get(`api/treatments/${id}/car`);
    }
    getCustomerById(id) {
        return this.http.get(`api/treatments/${id}/customer`);
    }
    ///////////////////////////////////
    add(treatment) {
        return this.http.post(`api/treatments/add`, treatment);
    }
    update(treatment) {
        return this.http.put(`api/treatments/${treatment._id}`, treatment);
    }
    delete(id) {
        return this.http.delete(`api/treatments/${id}`);
    }
};
TreatmentService = __decorate([
    Injectable({ providedIn: 'root' })
], TreatmentService);
export { TreatmentService };
//# sourceMappingURL=treatment.services.js.map