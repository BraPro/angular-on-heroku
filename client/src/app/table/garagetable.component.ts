import { Component,OnInit, ViewChild } from '@angular/core';
 
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CarDialogBoxComponent } from '../main/dialog-box/car-dialog-box.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

 
export interface TreatmentData {
  id: number;
  car: number;
  customer: string;
  details: string;
  status: string;
}
 
const ELEMENT_DATA: TreatmentData[] = [
  {id: 1560608769632, car:123456789, customer:'shlomi', details:'פנצר', status:'waiting'},
  {id: 1560608769633, car:123456789, customer:'shlomi', details:'פנצר', status:'waiting'},
  {id: 1560608769634, car:123456789, customer:'shlomi', details:'פנצר', status:'waiting'},
  {id: 1560608769635, car:123456789, customer:'shlomi', details:'פנצר', status:'waiting'},
  {id: 1560608769636, car:123456789, customer:'shlomi', details:'פנצר', status:'waiting'},
  {id: 1560608769637, car:123456789, customer:'shlomi', details:'פנצר', status:'waiting'},
  {id: 1560608769638, car:123456789, customer:'shlomi', details:'פנצר', status:'waiting'},
  {id: 1560608769639, car:123456789, customer:'shlomi', details:'פנצר', status:'waiting'},
  {id: 1560608769640, car:123456789, customer:'shlomi', details:'פנצר', status:'waiting'},
  {id: 1560608769641, car:123456789, customer:'shlomi', details:'פנצר', status:'waiting'},
  {id: 1560608769642, car:123456789, customer:'shlomi', details:'פנצר', status:'waiting'},
  {id: 1560608769643, car:123456789, customer:'shlomi', details:'פנצר', status:'waiting'},
  {id: 1560608769644, car:123456789, customer:'shlomi', details:'פנצר', status:'waiting'},
  {id: 1560608769645, car:123456789, customer:'shlomi', details:'פנצר', status:'waiting'},
  {id: 1560608769646, car:123456789, customer:'shlomi', details:'פנצר', status:'waiting'},
  {id: 1560608769647, car:123456789, customer:'shlomi', details:'פנצר', status:'waiting'},
];
@Component({
  selector: 'app-garagetable',
  templateUrl: './garagetable.component.html',
  styleUrls: ['./garagetable.component.css']
})
export class GarageTableComponent implements OnInit {
  displayedColumns: string[] = ['id','car','customer','details','status','action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
 
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
	  this.dataSource.sort = this.sort;
	  this.dataSource.paginator = this.paginator;
	}
 
  constructor(public dialog: MatDialog) {}
 
  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(CarDialogBoxComponent, {
      width: '250px',
      data:obj
    });
 
    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Edit'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }
 
  addRowData(row_obj){
    var d = new Date();
    this.dataSource.data.push({
      id:d.getTime(),
      car:row_obj.car,
      customer:row_obj.customer,
      details:row_obj.details,
      status:row_obj.status,
    });
    this.table.renderRows();
    this.refreshTable();
    
  }
  updateRowData(row_obj){
     this.dataSource.data = this.dataSource.data.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.car = row_obj.car;
        value.customer = row_obj.customer;
        value.details = row_obj.details;
        value.status = row_obj.status;
      }
      this.refreshTable();
      return true;
    });
  
    
  }
  deleteRowData(row_obj){
    this.dataSource.data = this.dataSource.data.filter((value,key)=>{
      return value.id != row_obj.id;
    });
    this.refreshTable();
  }

  applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  private refreshTable() {
    this.dataSource.paginator = this.paginator;
}
 
 
}
 