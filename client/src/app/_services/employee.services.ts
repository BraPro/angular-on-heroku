import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Employee, Response, Manager, Garage} from '../_models'
import {environment} from '../environment'

@Injectable({ providedIn: 'root' })
export class EmployeeService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Employee[]>(environment.apiHost + `/employees`);
    }

    getById(id: number) {
        return this.http.get<Employee>(environment.apiHost + `/employees/${id}`);
    }

    ///////////////////////////////////
    getFullById(id: number) {
        return this.http.get<Employee>(environment.apiHost + `/employees/${id}/full`);
    }

    getManagerById(id: number) {
        return this.http.get<Manager>(environment.apiHost + `/employees/${id}/manager`);
    }

    getGarageById(id: number) {
        return this.http.get<Garage>(environment.apiHost + `/employees/${id}/garage`);
    }
    ///////////////////////////////////

    update(emp: Employee) {
        return this.http.put<Response>(environment.apiHost + `/employees/${emp._id}`, emp);
    }

    delete(id: number) {
        return this.http.delete<Response>(environment.apiHost + `/employees/${id}`);
    }
}