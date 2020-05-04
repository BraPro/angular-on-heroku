import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Garage , Location } from '../../_models'


@Component({
  selector: 'app-map-dialog-box',
  templateUrl: './map-dialog-box.component.html',
  styleUrls: ['./map-dialog-box.component.css']
})
export class MapDialogBoxComponent {
  action:string;
  local_data:Garage;
  action_data: Garage;

  constructor(
    public dialogRef: MatDialogRef<MapDialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.action = data[1];
    this.local_data=data[0];
    this.action_data = new Garage();
    this.action_data.location = new Location();
    
  }
 
  doAction(){
   if(this.action == "Add")
   this.dialogRef.close({event:this.action,data:this.action_data});
   else
   this.dialogRef.close({event:this.action,data:this.action_data});
  }
 
  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

  onSelection(e, v){
    this.action_data = e.option.value;
   }
 
 

}