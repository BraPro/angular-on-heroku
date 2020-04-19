import { __decorate, __param } from "tslib";
import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
let DialogBoxComponent = class DialogBoxComponent {
    constructor(dialogRef, 
    //@Optional() is used to prevent error if no data is passed
    data) {
        this.dialogRef = dialogRef;
        this.data = data;
        console.log(data);
        this.local_data = Object.assign({}, data);
        this.action = this.local_data.action;
    }
    doAction() {
        this.dialogRef.close({ event: this.action, data: this.local_data });
    }
    closeDialog() {
        this.dialogRef.close({ event: 'Cancel' });
    }
};
DialogBoxComponent = __decorate([
    Component({
        selector: 'app-dialog-box',
        templateUrl: './dialog-box.component.html',
        styleUrls: ['./dialog-box.component.css']
    }),
    __param(1, Optional()), __param(1, Inject(MAT_DIALOG_DATA))
], DialogBoxComponent);
export { DialogBoxComponent };
//# sourceMappingURL=dialog-box.component.js.map