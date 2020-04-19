import { __decorate } from "tslib";
import { Component, Input, EventEmitter, Output } from '@angular/core';
let AlertComponent = class AlertComponent {
    constructor(host, formBuilder, 
    //private route: ActivatedRoute,
    router, el
    //private authenticationService: AuthenticationService,
    //private alertService: AlertService
    ) {
        this.host = host;
        this.formBuilder = formBuilder;
        this.router = router;
        this.el = el;
        //alertComponent: ReactiveFormsModule;
        this.submitted = false;
        this.visibility = 'visible';
        this.output = new EventEmitter();
        this.end = new EventEmitter();
        this.inputSliderValueChange = new EventEmitter();
        // redirect to home if already logged in
        //if (this.authenticationService.currentUserValue) { 
        //    this.router.navigate(['/']);
        //}
        this.element = el.nativeElement;
        //console.log(viewContainerRef);
        //	$('#AltRes').text(data.response);
        //$('#AltMSG').text(data.msg);
    }
    ngOnInit() {
        let modal = this;
        // get return url from route parameters or default to '/'
        //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
};
__decorate([
    Output()
], AlertComponent.prototype, "output", void 0);
__decorate([
    Output()
], AlertComponent.prototype, "end", void 0);
__decorate([
    Input()
], AlertComponent.prototype, "altRes", void 0);
__decorate([
    Input()
], AlertComponent.prototype, "altMessage", void 0);
__decorate([
    Output()
], AlertComponent.prototype, "inputSliderValueChange", void 0);
AlertComponent = __decorate([
    Component({
        templateUrl: './alert.component.html',
        styleUrls: ['./alert.component.css']
    })
], AlertComponent);
export { AlertComponent };
//# sourceMappingURL=alert.component.js.map