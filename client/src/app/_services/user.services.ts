import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Employee, Response} from '../_models'
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(protected http: HttpClient) { }

    signup(e : Employee) {
        return this.http.post<Response>(`${environment.apiUrl}/users/signup`, e);
    }

    forgotPassword(e : Employee) {
        return this.http.post<Response>(`${environment.apiUrl}/users/forgotpassword`, e);
    }

    login(e : Employee) {
        return this.http.post<Response>(`${environment.apiUrl}/users/login`, e);
    }

    logout() {
        return this.http.post<Response>(`${environment.apiUrl}/users/logout`, '');
    }

}