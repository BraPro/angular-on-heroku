import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../../_models'

@Component({
  selector: 'app-user-dialog-box',
  templateUrl: './user-dialog-box.component.html',
  styleUrls: ['./user-dialog-box.component.css']
})
export class UserDialogBoxComponent {
 
  action:string;
  local_data:any;
  newPassword : string;
  constructor(
    public dialogRef: MatDialogRef<UserDialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Employee) {
    this.local_data = {...data};
    this.action = this.local_data.action;

    this.newPassword = this.createPassword();
  }
 
  doAction(){
    if(this.action == "ResetPassword"){
      this.local_data.password = this.newPassword;
    }
    this.dialogRef.close({event:this.action,data:this.local_data});
  }
 
  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }
 
  createPassword(){
    var generate = (
      length = 8,
      wishlist = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$"
    ) => Array(length)
          .fill('') // fill an empty will reduce memory usage
          .map(() => wishlist[Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1) * wishlist.length)])
          .join('');
    return generate();
  }

}