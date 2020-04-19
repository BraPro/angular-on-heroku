import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response, Car, Treatment, Garage, Customer} from '../_models'

@Injectable({ providedIn: 'root' })
export class TreatmentService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Treatment[]>(`api/treatments`);
    }

    getById(id: number) {
        return this.http.get<Treatment>(`api/treatments/${id}`);
    }

    ///////////////////////////////////
    getFullById(id: number) {
        return this.http.get<Treatment>(`api/treatments/${id}/full`);
    }

    getGarageById(id: number) {
        return this.http.get<Garage>(`api/treatments/${id}/garage`);
    }

    getCarById(id: number) {
        return this.http.get<Car>(`api/treatments/${id}/car`);
    }

    getCustomerById(id: number) {
        return this.http.get<Customer>(`api/treatments/${id}/customer`);
    }
    ///////////////////////////////////

    add(treatment: Treatment) {
        return this.http.post<Response>(`api/treatments/add`, treatment);
    }

    update(treatment: Treatment) {
        return this.http.put<Response>(`api/treatments/${treatment._id}`, treatment);
    }

    delete(id: number) {
        return this.http.delete<Response>(`api/treatments/${id}`);
    }
}