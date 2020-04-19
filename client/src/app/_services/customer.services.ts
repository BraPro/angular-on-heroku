import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Response, Customer, Car, Treatment} from '../_models'

@Injectable({ providedIn: 'root' })
export class CustomerService {
    constructor(protected http: HttpClient) { }

    getAll() {
        return this.http.get<Customer[]>(`api/customers`);
    }

    getById(id: number) {
        return this.http.get<Customer>(`api/customers/${id}`);
    }

    ///////////////////////////////////
    getFullById(id: number) {
        return this.http.get<Customer>(`api/customers/${id}/full`);
    }

    getCarsById(id: number) {
        return this.http.get<Car[]>(`api/customers/${id}/cars`);
    }

    getTtreatmentsById(id: number) {
        return this.http.get<Treatment[]>(`api/customers/${id}/treatments`);
    }
    ///////////////////////////////////

    add(customer: Customer) {
        return this.http.post<Response>(`api/customers/add`, customer);
    }

    update(customer: Customer) {
        return this.http.put<Response>(`api/customers/${customer.id}`, customer);
    }

    delete(id: number) {
        return this.http.delete<Response>(`api/customers/${id}`);
    }
}