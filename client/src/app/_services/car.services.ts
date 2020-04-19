import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response, Car, Customer, Treatment} from '../_models'

@Injectable({ providedIn: 'root' })
export class CarService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Car[]>(`api/cars`);
    }

    getById(id: number) {
        return this.http.get<Car>(`api/cars/${id}`);
    }

    ///////////////////////////////////
    getFullById(id: number) {
        return this.http.get<Car>(`api/cars/${id}/full`);
    }

    getCustomersById(id: number) {
        return this.http.get<Customer[]>(`api/cars/${id}/customers`);
    }

    getTtreatmentById(id: number) {
        return this.http.get<Treatment>(`api/cars/${id}/treatments`);
    }
    ///////////////////////////////////

    add(car: Car) {
        return this.http.post<Response>(`api/cars/add`, car);
    }

    update(car: Car) {
        return this.http.put<Response>(`api/cars/${car.id}`, car);
    }

    delete(id: number) {
        return this.http.delete<Response>(`api/cars/${id}`);
    }
}