import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Employee, Response, Manager, Garage} from '../_models'

@Injectable({ providedIn: 'root' })
export class EmployeeService {
    constructor(protected http: HttpClient) { }

    getAll() {
        return this.http.get<Employee[]>(`api/employees`);
    }

    getById(id: number) {
        return this.http.get<Employee>(`api/employees/${id}`);
    }

    ///////////////////////////////////
    getFullById(id: number) {
        return this.http.get<Employee>(`api/employees/${id}/full`);
    }

    getManagerById(id: number) {
        return this.http.get<Manager>(`api/employees/${id}/manager`);
    }

    getGarageById(id: number) {
        return this.http.get<Garage>(`api/employees/${id}/garage`);
    }
    ///////////////////////////////////

    update(emp: Employee) {
        return this.http.put<Response>(`api/employees/${emp.id}`, emp);
    }

    delete(id: number) {
        return this.http.delete<Response>(`api/employees/${id}`);
    }
}