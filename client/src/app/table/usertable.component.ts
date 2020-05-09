import { Component,OnInit, ViewChild } from '@angular/core';
 
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogBoxComponent } from '../main/dialog-box/user-dialog-box.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Employee } from '@app/_models';
import { GarageService , UserService ,TreatmentService } from '../_services';
import { SharedService } from '@app/shared/shared.service';
import { first } from 'rxjs/operators';
import { EmployeeService } from '@app/_services/employee.services';
 

  
@Component({
  selector: 'app-usertable',
  templateUrl: './usertable.component.html',
  styleUrls: ['./usertable.component.css']
})
export class UserTableComponent implements OnInit {
  displayedColumns: string[] = ['id','firstname','lastname','garage','status','manager','email','action'];
  dataSource = new MatTableDataSource<Employee>();
 
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  

  ngOnInit() {
    this.refreshTable();
	  this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator; 
	}
 
  constructor(public dialog: MatDialog,
    private userService : UserService,
    private treatmentService:TreatmentService,
    private sharedService: SharedService,
    private employeeService:EmployeeService){
    }
 
  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(UserDialogBoxComponent, {
      width: '250px',
      data:obj
    });
 
    dialogRef.afterClosed().subscribe(result => {

      if((result.data.garage != null) && !(result.data.garage as number)){
        result.data.garage = result.data.garage._id;
      }
      
      if(result.event == 'ResetPassword'){
        this.updateRowData(result.data);
      }else if(result.event == 'Edit' || result.event == 'Permission'){
        this.updateRowData(result.data);
      }
    });
  }
 
  updateRowData(row_obj){
    this.employeeService.update(row_obj)
		.pipe(first())
		.subscribe(
			data => {
        //import to table
        this.sharedService.sendAlertEvent(data);
        this.refreshTable();
			});
  }
  
  deleteRowData(row_obj){

  /*  this.dataSource.data = this.dataSource.data.filter((value,key)=>{
      return value.id != row_obj.id;
    });
    this.refreshTable();*/
  }

  applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  private refreshTable() {
    this.employeeService.getAllFull()
		.pipe(first())
		.subscribe(
			data => {
        //import to table
        this.dataSource.data=data;
			});
    this.dataSource.paginator = this.paginator;
}
 
 
}
 