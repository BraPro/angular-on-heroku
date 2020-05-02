import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Garage } from '../../_models'

@Component({
  selector: 'app-map-dialog-box',
  templateUrl: './map-dialog-box.component.html',
  styleUrls: ['./map-dialog-box.component.css']
})
export class MapDialogBoxComponent {
 
  action:string;
  local_data:Garage;


  constructor(
    public dialogRef: MatDialogRef<MapDialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.action = data[1];
    this.local_data=data[0];
  }
 
  doAction(){
    this.dialogRef.close({event:this.action,data:this.local_data});
  }
 
  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }
 
 

}