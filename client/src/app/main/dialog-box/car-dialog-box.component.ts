import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
 
export interface TreatmentData {
  id: number;
  car: number;
  customer: string;
  details: string;
  status: string;
}
 
@Component({
  selector: 'app-car-dialog-box',
  templateUrl: './car-dialog-box.component.html',
  styleUrls: ['./car-dialog-box.component.css']
})
export class CarDialogBoxComponent {
 
  action:string;
  local_data:any;
 
  constructor(
    public dialogRef: MatDialogRef<CarDialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: TreatmentData) {
    console.log(data);
    this.local_data = {...data};
    this.action = this.local_data.action;
  }
 
  doAction(){
    this.dialogRef.close({event:this.action,data:this.local_data});
  }
 
  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }
 
}