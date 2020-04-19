import { Component,OnInit, ViewChild } from '@angular/core';
 
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogBoxComponent } from '../main/dialog-box/user-dialog-box.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

 
export interface RegisterElements {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  permission: string;
}

const ELEMENT_DATA: RegisterElements[] = [
  {id: 123456789, email:'xxshlomixx@gmail.com', firstname:'shlomi', lastname: 'Levi', password:'Shlomi11!' ,permission:'employee'},
  {id: 123456789, email:'xxshlomixx@gmail.com', firstname:'shlomi', lastname: 'Levi', password:'Shlomi11!' ,permission:'employee'},
  {id: 123456789, email:'xxshlomixx@gmail.com', firstname:'shlomi', lastname: 'Levi', password:'Shlomi11!' ,permission:'employee'},
  {id: 123456789, email:'xxshlomixx@gmail.com', firstname:'shlomi', lastname: 'Levi', password:'Shlomi11!' ,permission:'employee'},
  {id: 123456789, email:'xxshlomixx@gmail.com', firstname:'shlomi', lastname: 'Levi', password:'Shlomi11!' ,permission:'employee'},
  {id: 123456789, email:'xxshlomixx@gmail.com', firstname:'shlomi', lastname: 'Levi', password:'Shlomi11!' ,permission:'employee'},
  {id: 123456789, email:'xxshlomixx@gmail.com', firstname:'shlomi', lastname: 'Levi', password:'Shlomi11!' ,permission:'employee'},
  {id: 123456789, email:'xxshlomixx@gmail.com', firstname:'shlomi', lastname: 'Levi', password:'Shlomi11!' ,permission:'employee'},
  {id: 123456789, email:'xxshlomixx@gmail.com', firstname:'shlomi', lastname: 'Levi', password:'Shlomi11!' ,permission:'employee'},
  {id: 123456789, email:'xxshlomixx@gmail.com', firstname:'shlomi', lastname: 'Levi', password:'Shlomi11!' ,permission:'employee'},
  {id: 123456789, email:'xxshlomixx@gmail.com', firstname:'shlomi', lastname: 'Levi', password:'Shlomi11!' ,permission:'employee'},
  {id: 123456789, email:'xxshlomixx@gmail.com', firstname:'shlomi', lastname: 'Levi', password:'Shlomi11!' ,permission:'employee'},
  {id: 123456789, email:'xxshlomixx@gmail.com', firstname:'shlomi', lastname: 'Levi', password:'Shlomi11!' ,permission:'employee'},
  {id: 123456789, email:'xxshlomixx@gmail.com', firstname:'shlomi', lastname: 'Levi', password:'Shlomi11!' ,permission:'employee'},
  {id: 123456789, email:'xxshlomixx@gmail.com', firstname:'shlomi', lastname: 'Levi', password:'Shlomi11!' ,permission:'employee'},
  {id: 123456789, email:'xxshlomixx@gmail.com', firstname:'shlomi', lastname: 'Levi', password:'Shlomi11!' ,permission:'employee'},
];
  
@Component({
  selector: 'app-usertable',
  templateUrl: './usertable.component.html',
  styleUrls: ['./usertable.component.css']
})
export class UserTableComponent implements OnInit {
  displayedColumns: string[] = ['id','email','firstname','lastname','password','permission','action'];
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
    const dialogRef = this.dialog.open(UserDialogBoxComponent, {
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
    this.dataSource.data.push({
      id:row_obj.id,
      email:row_obj.email,
      firstname:row_obj.firstname,
      lastname:row_obj.lastname,
      password:row_obj.password,
      permission:row_obj.permission,
    });
    this.table.renderRows();
    this.refreshTable();
    
  }
  updateRowData(row_obj){
     this.dataSource.data = this.dataSource.data.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.email=row_obj.email;
        value.firstname=row_obj.firstname;
        value.lastname=row_obj.lastname;
        value.password=row_obj.password;
        value.permission=row_obj.permission;
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
 