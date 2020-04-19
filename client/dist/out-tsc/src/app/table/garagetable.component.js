import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
const ELEMENT_DATA = [
    { id: 1560608769632, car: 123456789, customer: 'shlomi', details: 'פנצר', status: 'waiting' },
    { id: 1560608769633, car: 123456789, customer: 'shlomi', details: 'פנצר', status: 'waiting' },
    { id: 1560608769634, car: 123456789, customer: 'shlomi', details: 'פנצר', status: 'waiting' },
    { id: 1560608769635, car: 123456789, customer: 'shlomi', details: 'פנצר', status: 'waiting' },
    { id: 1560608769636, car: 123456789, customer: 'shlomi', details: 'פנצר', status: 'waiting' },
    { id: 1560608769637, car: 123456789, customer: 'shlomi', details: 'פנצר', status: 'waiting' },
    { id: 1560608769638, car: 123456789, customer: 'shlomi', details: 'פנצר', status: 'waiting' },
    { id: 1560608769639, car: 123456789, customer: 'shlomi', details: 'פנצר', status: 'waiting' },
    { id: 1560608769640, car: 123456789, customer: 'shlomi', details: 'פנצר', status: 'waiting' },
    { id: 1560608769641, car: 123456789, customer: 'shlomi', details: 'פנצר', status: 'waiting' },
    { id: 1560608769642, car: 123456789, customer: 'shlomi', details: 'פנצר', status: 'waiting' },
    { id: 1560608769643, car: 123456789, customer: 'shlomi', details: 'פנצר', status: 'waiting' },
    { id: 1560608769644, car: 123456789, customer: 'shlomi', details: 'פנצר', status: 'waiting' },
    { id: 1560608769645, car: 123456789, customer: 'shlomi', details: 'פנצר', status: 'waiting' },
    { id: 1560608769646, car: 123456789, customer: 'shlomi', details: 'פנצר', status: 'waiting' },
    { id: 1560608769647, car: 123456789, customer: 'shlomi', details: 'פנצר', status: 'waiting' },
];
let GarageTableComponent = class GarageTableComponent {
    constructor(dialog) {
        this.dialog = dialog;
        this.displayedColumns = ['id', 'car', 'customer', 'details', 'status', 'action'];
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    }
    ngOnInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }
    openDialog(action, obj) {
        obj.action = action;
        const dialogRef = this.dialog.open(DialogBoxComponent, {
            width: '250px',
            data: obj
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result.event == 'Add') {
                this.addRowData(result.data);
            }
            else if (result.event == 'Update') {
                this.updateRowData(result.data);
            }
            else if (result.event == 'Delete') {
                this.deleteRowData(result.data);
            }
        });
    }
    addRowData(row_obj) {
        var d = new Date();
        this.dataSource.data.push({
            id: d.getTime(),
            car: row_obj.car,
            customer: row_obj.customer,
            details: row_obj.details,
            status: row_obj.status,
        });
        this.table.renderRows();
        this.refreshTable();
    }
    updateRowData(row_obj) {
        this.dataSource.data = this.dataSource.data.filter((value, key) => {
            if (value.id == row_obj.id) {
                value.car = row_obj.car;
                value.customer = row_obj.customer;
                value.details = row_obj.details;
                value.status = row_obj.status;
            }
            this.refreshTable();
            return true;
        });
    }
    deleteRowData(row_obj) {
        this.dataSource.data = this.dataSource.data.filter((value, key) => {
            return value.id != row_obj.id;
        });
        this.refreshTable();
    }
    applyFilter(event) {
        const filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    refreshTable() {
        this.dataSource.paginator = this.paginator;
    }
};
__decorate([
    ViewChild(MatTable, { static: true })
], GarageTableComponent.prototype, "table", void 0);
__decorate([
    ViewChild(MatSort, { static: true })
], GarageTableComponent.prototype, "sort", void 0);
__decorate([
    ViewChild(MatPaginator, { static: true })
], GarageTableComponent.prototype, "paginator", void 0);
GarageTableComponent = __decorate([
    Component({
        selector: 'app-garagetable',
        templateUrl: './garagetable.component.html',
        styleUrls: ['./garagetable.component.css']
    })
], GarageTableComponent);
export { GarageTableComponent };
//# sourceMappingURL=garagetable.component.js.map