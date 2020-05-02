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
      if(result.event == 'ResetPassword'){
        this.ResetRowPass(result.data);
      }else if(result.event == 'Edit'){
        this.updateRowData(result.data);
      }
    });
  }
 
  ResetRowPass(row_obj){

    this.employeeService.update(row_obj)
		.pipe(first())
		.subscribe(
			data => {
        //import to table
        this.refreshTable();
			},
			error => {
				//this.alertService.error(error);
				this.sharedService.sendAlertEvent(error);
			},
			() => {
			});
    /* this.dataSource.data.push({
      id:row_obj.id,
      email:row_obj.email,
      firstname:row_obj.firstname,
      lastname:row_obj.lastname,
      password:row_obj.password,
      permission:row_obj.permission,
    });
    this.table.renderRows();
    this.refreshTable();*/
    
  }
  updateRowData(row_obj){
    this.employeeService.update(row_obj)
		.pipe(first())
		.subscribe(
			data => {
        //import to table
        this.refreshTable();
			},
			error => {
				//this.alertService.error(error);
				this.sharedService.sendAlertEvent(error);
			},
			() => {
			});

    /*this.dataSource.data = this.dataSource.data.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.email=row_obj.email;
        value.firstname=row_obj.firstname;
        value.lastname=row_obj.lastname;
        value.password=row_obj.password;
        value.permission=row_obj.permission;
      }
      this.refreshTable();
      return true;
    });*/
  
    
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
    this.employeeService.getAll()
		.pipe(first())
		.subscribe(
			data => {
        //import to table
        this.dataSource.data=data;
			},
			error => {
				//this.alertService.error(error);
				this.sharedService.sendAlertEvent(error);
			},
			() => {
			});
    this.dataSource.paginator = this.paginator;
}
 
 
}
 