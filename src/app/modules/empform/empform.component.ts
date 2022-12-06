import {Component, OnInit} from '@angular/core';

import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-empform',
  templateUrl: './empform.component.html',
  styleUrls: ['./empform.component.css']
})
export class EmpformComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<EmpformComponent>,
   
     ) 
     {
    
      }

  
  ngOnInit(){
  }
   
    
    


  onClose(){
    
    this.dialogRef.close();

  }
  
  }


 


