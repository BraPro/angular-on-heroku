import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Garage, Response, Manager} from '../_models'

@Injectable({ providedIn: 'root' })
export class ManagerService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Manager[]>(`api/managers`);
    }

    getById(id: number) {
        return this.http.get<Manager>(`api/managers/${id}`);
    }

    ///////////////////////////////////
    getFullById(id: number) {
        return this.http.get<Manager>(`api/managers/${id}/full`);
    }

    getEmployeesById(id: number) {
        return this.http.get<Garage[]>(`api/managers/${id}/employees`);
    }
    ///////////////////////////////////
}