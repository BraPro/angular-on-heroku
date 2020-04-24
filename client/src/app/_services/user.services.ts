import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Employee, Response} from '../_models'
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
    private currentUserSubject: BehaviorSubject<Employee>;
    public currentUser: Observable<Employee>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<Employee>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): Employee {
        return this.currentUserSubject.value;
    }

    signup(e : Employee) {
        return this.http.post<Response>(`${environment.apiUrl}/users/signup`, e);
    }

    forgotPassword(e : Employee) {
        return this.http.post<Response>(`${environment.apiUrl}/users/forgotpassword`, e);
    }

    login(e : Employee) {
        return this.http.post<Response>(`${environment.apiUrl}/users/login`, e)
        .pipe(map(response => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            response.data.token = response.token
            localStorage.setItem('currentUser', JSON.stringify(response.data));
            this.currentUserSubject.next(response.data);
            return response.data;
        }));
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        return this.http.post<Response>(`${environment.apiUrl}/users/logout`, '');
    }

}