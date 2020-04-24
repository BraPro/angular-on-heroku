import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response, Treatment, Garage} from '../_models'
import { environment } from '../environment';

@Injectable({ providedIn: 'root' })
export class TreatmentService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Treatment[]>(environment.apiHost + `/treatments`);
    }

    getById(id: number) {
        return this.http.get<Treatment>(environment.apiHost + `/treatments/${id}`);
    }

    ///////////////////////////////////
    getFullById(id: number) {
        return this.http.get<Treatment>(environment.apiHost + `/treatments/${id}/full`);
    }

    getGarageById(id: number) {
        return this.http.get<Garage>(environment.apiHost + `/treatments/${id}/garage`);
    }
    ///////////////////////////////////

    add(treatment: Treatment) {
        return this.http.post<Response>(environment.apiHost + `/treatments/add`, treatment);
    }

    update(treatment: Treatment) {
        return this.http.put<Response>(environment.apiHost + `/treatments/${treatment._id}`, treatment);
    }

    delete(id: number) {
        return this.http.delete<Response>(environment.apiHost + `/treatments/${id}`);
    }
}