import { Component,OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogBoxComponent } from '../main/dialog-box/user-dialog-box.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Employee, GarageReport } from '@app/_models';
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
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<Employee>();
 
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  constructor(public dialog: MatDialog,
    private userService : UserService,
    private garageService : GarageService,
    private sharedService: SharedService,
    private employeeService:EmployeeService){
  }

  ngOnInit() {
    switch(String(this.userService.getUserPermission())){
      case 'Admin':
        this.displayedColumns = ['id','firstname','lastname','garage','status','manager','email','action'];
        break;
      case 'Manager':
        this.displayedColumns = ['id','firstname','lastname','status','email','action'];
        break;
      default:
        break;
    }
    
    this.loadTable();
	  this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator; 
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
        this.loadTable();
			});
  }
  
  deleteRowData(row_obj){

  /*  this.dataSource.data = this.dataSource.data.filter((value,key)=>{
      return value.id != row_obj.id;
    });
    this.loadTable();*/
  }

  applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  columnNotInclude(column : string){
    switch(String(this.userService.getUserPermission())){
      case 'Admin':
        return true;
      case 'Manager':
        return !((column == 'garage') || (column == 'manager'));
      default:
        return false;
    }
  }

  loadTable(){
    switch(String(this.userService.getUserPermission())){
      case 'Admin':
        this.refreshTableAllEmployees();
        break;
      case 'Manager':
        this.refreshTableGarage();
      break;
      default:
        break;
    }
  }

  refreshTableAllEmployees() {
    this.employeeService.getAllFull().pipe(first())
		.subscribe(data => {
        this.dataSource.data = data;
		});
    this.dataSource.paginator = this.paginator;
  }

  refreshTableGarage() {
    this.garageService.getEmployeesById(Number(this.userService.currentUserValue.garage)).pipe(first())
		.subscribe(data => {
        this.dataSource.data = data;
		});
    this.dataSource.paginator = this.paginator;
  }
}
 