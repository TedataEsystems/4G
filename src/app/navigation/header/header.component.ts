import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConfigurationService } from 'src/app/shared/services/configuration.service';
import { NotifyserService } from 'src/app/shared/services/notifyser.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService} from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
@Output() public sidenavToggle = new EventEmitter();
   username: any='user';

  constructor(private notser:NotificationService, private _router: Router, private notifyser:NotifyserService, private config:ConfigurationService) {

   }
   notifies :any[]=[];
 readnum:any=0;
  ngOnInit(): void {
  this.username = localStorage.getItem("usernam");
  this.notifyser.getnotify().subscribe(x=>{
    //description: "Request of id:64 has been created" 
  if(x.status==true){
    this.notifies=x.data;
    this.readnum=x.unReaded;
  }
  else{
 //   this.notser.warn(x.error);

  }
    
  },err=>{
    if(err.status==401)
    this._router.navigate(['/login']);
    //else  
   // this.notser.warn("! Fail");
   
  });

  } 
  getNotify(){
    this.notifyser.readNotify().subscribe(x=>{
      
      if(x.status==true){
   this.readnum=0;

      }
      else{
      //  this.notser.warn(x.error);      
        }
      
    },err=>{
        if(err.status==401)
        this._router.navigate(['/login']);
       // else 
     //   this.notser.warn("! Fail");
       
      })
    // this.notifyser.getnotify().subscribe(x=>{
    //   //description: "Request of id:64 has been created" 
    // if(x.status==true){
    //   this.notifies=x.data;
    // }
    // else{
    //   this.notser.warn(x.error);
  
    // }
    //   console.log(x);
    // },err=>{
    //   if(err.status==401)
    //   this._router.navigate(['/login']);
    //   else 
    //   this.notser.warn("! Fail");
     
    // });
  }
  public onToggleSidenav=()=> {  
 this.sidenavToggle.emit();
  }



  signOut(){
    this.config.Logout();
  }
}