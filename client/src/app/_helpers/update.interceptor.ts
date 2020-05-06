import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '@environments/environment';
import { first } from 'rxjs/operators';
import { Variable } from '@angular/compiler/src/render3/r3_ast';

@Injectable()
export class UpdateInterceptor implements HttpInterceptor {

    constructor(private http: HttpClient) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(request.headers.has('None')){
            return next.handle(request);
        }
        
        this.http.get<Variable>(`${environment.apiUrl}/sync/1`, { headers: new HttpHeaders({ 'None': 'true'})})
		.pipe(first())
		.subscribe(
			data => {
				console.log(data);
            });
        
        return next.handle(request);
        /*
        return request.handle(
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.userService.logout();
                location.reload(true);
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
        */
    }
}