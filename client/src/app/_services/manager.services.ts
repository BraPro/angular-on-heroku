import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Garage, Response, Manager} from '../_models'
import { environment } from '../environment';

@Injectable({ providedIn: 'root' })
export class ManagerService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Manager[]>(environment.apiHost + `/managers`);
    }

    getById(id: number) {
        return this.http.get<Manager>(environment.apiHost + `/managers/${id}`);
    }

    ///////////////////////////////////
    getFullById(id: number) {
        return this.http.get<Manager>(environment.apiHost + `/managers/${id}/full`);
    }

    getEmployeesById(id: number) {
        return this.http.get<Garage[]>(environment.apiHost + `/managers/${id}/employees`);
    }
    ///////////////////////////////////
}