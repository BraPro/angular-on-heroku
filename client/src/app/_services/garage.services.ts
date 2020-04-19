import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Garage, Response, Employee, Treatment, Manager} from '../_models'

@Injectable({ providedIn: 'root' })
export class GarageService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Garage[]>(`api/garages`);
    }

    getById(id: number) {
        return this.http.get<Garage>(`api/garages/${id}`);
    }

    ///////////////////////////////////
    getFullById(id: number) {
        return this.http.get<Manager>(`api/garages/${id}/full`);
    }

    getManagerById(id: number) {
        return this.http.get<Manager>(`api/garages/${id}/manager`);
    }

    getEmployeesById(id: number) {
        return this.http.get<Employee[]>(`api/garages/${id}/employees`);
    }

    getTreatmentsById(id: number) {
        return this.http.get<Treatment[]>(`api/garages/${id}/treatments`);
    }
    ///////////////////////////////////

    add(garage: Garage) {
        return this.http.post<Response>(`api/garages/add`, garage);
    }

    update(garage: Garage) {
        return this.http.put<Response>(`api/garages/${garage._id}`, garage);
    }

    delete(id: number) {
        return this.http.delete<Response>(`api/garages/${id}`);
    }
}