import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Employee, Response} from '../_models'

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(protected http: HttpClient) { }

    signup(e : Employee) {
        return this.http.post<Response>(`api/users/signup`, e);
    }

    forgotPassword(e : Employee) {
        return this.http.post<Response>(`api/users/forgotpassword`, e);
    }

    login(e : Employee) {
        return this.http.post<Response>(`api/users/login`, e);
    }

    logout() {
        return this.http.post<Response>(`api/users/logout`, '');
    }

}