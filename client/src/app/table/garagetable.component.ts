import { Component,OnInit, ViewChild } from '@angular/core';
 
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CarDialogBoxComponent } from '../main/dialog-box/car-dialog-box.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GarageService , UserService ,TreatmentService } from '../_services';
import { first } from 'rxjs/operators';
import { Treatment , Garage } from '@app/_models';
import { SharedService } from '@app/shared/shared.service';


 

@Component({
  selector: 'app-garagetable',
  templateUrl: './garagetable.component.html',
  styleUrls: ['./garagetable.component.css']
})
export class GarageTableComponent implements OnInit {
  displayedColumns: string[] = ['date','id','carid','cost','status','details','action'];
  dataSource = new MatTableDataSource<Treatment>();
  permission: string;  //'New Employee','Employee', 'Manager', 'Admin', 'None'
  garageList :Garage[];
  selectedGarage:Garage;


  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  

  ngOnInit() {
    if(this.permission == "Admin")
     this.getGarages();
    else
      this.refreshTable();
	}
 
  constructor(public dialog: MatDialog,
    private garageService : GarageService,
    private userService : UserService,
    private treatmentService:TreatmentService,
    private sharedService: SharedService){
      this.sharedService.getSelectMenuEvent().subscribe(res => {
        this.permission = res;
      })
    }

 
 
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
    row_obj.garage = this.userService.currentUserValue.garage;
    this.treatmentService.add(row_obj)
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
   /* var d = new Date();
    this.dataSource.data.push({
      id:d.getTime(),
      carid:row_obj.car,
      customer:row_obj.customer,
      details:row_obj.details,
      status:row_obj.status,
    });
    this.table.renderRows();
    this.refreshTable();*/
    
  }
  updateRowData(row_obj){
    this.treatmentService.update(row_obj)
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
        value.carid = row_obj.car;
        value.customer = row_obj.customer;
        value.details = row_obj.details;
        value.status = row_obj.status;
      }
      this.refreshTable();
      return true;
    });*/
  
    
  }
  deleteRowData(row_obj){
    this.treatmentService.delete(row_obj._id)
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
      return value.id != row_obj.id;
    });
    this.refreshTable();*/
  }

  applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  private refreshTable() {
    var garageId;
    if(this.permission=="Admin")
      garageId=this.selectedGarage._id;
    else
      garageId=Number(this.userService.currentUserValue.garage);
    
    console.log(this.userService.currentUserValue);
    this.garageService.getTreatmentsById(garageId)
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
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      
}

   getGarages(){

    this.garageService.getAll()
   .pipe(first())
   .subscribe(
      data => {
        this.garageList=data;
      },
      error => {
        //this.alertService.error(error);
        this.sharedService.sendAlertEvent(error);
      },
      () => {
      });

  }

  public loadGarage(){
    this.refreshTable();
  }



}
 