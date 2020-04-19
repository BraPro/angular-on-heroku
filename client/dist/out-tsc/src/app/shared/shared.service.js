import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
let SharedService = class SharedService {
    constructor() {
        this.subject = new Subject();
    }
    sendClickEvent(e) {
        this.subject.next(e);
    }
    getClickEvent() {
        return this.subject.asObservable();
    }
};
SharedService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], SharedService);
export { SharedService };
//# sourceMappingURL=shared.service.js.map