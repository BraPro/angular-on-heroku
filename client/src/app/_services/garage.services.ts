import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Garage, Response, Employee, Treatment, Manager} from '../_models'
import { environment } from '../environment';

@Injectable({ providedIn: 'root' })
export class GarageService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Garage[]>(environment.apiHost + `/garages`);
    }

    getById(id: number) {
        return this.http.get<Garage>(environment.apiHost + `/garages/${id}`);
    }

    ///////////////////////////////////
    getFullById(id: number) {
        return this.http.get<Manager>(environment.apiHost + `/garages/${id}/full`);
    }

    getManagerById(id: number) {
        return this.http.get<Manager>(environment.apiHost + `/garages/${id}/manager`);
    }

    getEmployeesById(id: number) {
        return this.http.get<Employee[]>(environment.apiHost + `/garages/${id}/employees`);
    }

    getTreatmentsById(id: number) {
        return this.http.get<Treatment[]>(environment.apiHost + `/garages/${id}/treatments`);
    }
    ///////////////////////////////////

    add(garage: Garage) {
        return this.http.post<Response>(environment.apiHost + `/garages/add`, garage);
    }

    update(garage: Garage) {
        return this.http.put<Response>(environment.apiHost + `/garages/${garage._id}`, garage);
    }

    delete(id: number) {
        return this.http.delete<Response>(environment.apiHost + `/garages/${id}`);
    }
}