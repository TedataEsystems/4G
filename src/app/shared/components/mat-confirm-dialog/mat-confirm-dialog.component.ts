import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService} from 'src/app/shared/services/notification.service';
import {EmpService} from "src/app/shared/services/emp.service";

@Component({
  selector: 'app-mat-confirm-dialog',
  templateUrl: './mat-confirm-dialog.component.html',
  styleUrls: ['./mat-confirm-dialog.component.css']
})
export class MatConfirmDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MatConfirmDialogComponent>,public notificationService: NotificationService,
    private ser: EmpService 
    ) { }

  ngOnInit(): void {
  }
  onClose(){
  
    this.dialogRef.close();

  }
  onDelete(){
    //if(confirm('Are you sure to delete this record ?')){
      this.ser.sendMessage('del');
        this.onClose();

      //   this.notificationService.warn('! Deleted successfully');
    //}
  }

}
