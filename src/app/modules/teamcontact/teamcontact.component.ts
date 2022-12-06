
import {Component,Input,NgModule, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { NotificationService} from 'src/app/shared/services/notification.service';
import { Title } from '@angular/platform-browser';
import { TeamcontactService } from 'src/app/shared/services/teamcontact.service';
import {FormControl, Validators} from '@angular/forms';
import { contactTeam } from 'src/app/Model/contactmail';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { EmpService } from 'src/app/shared/services/emp.service';
 
import {FormGroup,FormGroupDirective} from '@angular/forms';
import { ConfigurationService } from 'src/app/shared/services/configuration.service';
import { ActivatedRoute, Router } from '@angular/router';
 
@Component({
  selector: 'app-teamcontact',
  templateUrl: './teamcontact.component.html',
  styleUrls: ['./teamcontact.component.css']
})
export class TeamcontactComponent implements OnInit {
 
  displayedColumns: string[] = ['id', 'mail', 'type', 'action'];
    columnsToDisplay: string[] = this.displayedColumns.slice();
contactList?:contactTeam[]=[];
contactListTab?:contactTeam[]=[];teamname='';
valdata="";valuid=0;
dataSource = new MatTableDataSource<any>();
delconct:any;
  searchKey:string ='';
  listName:string ='';
  loading: boolean = true;
  selected: boolean = false;
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  param1='';settingtype='';
  @ViewChild(FormGroupDirective) formGroupDirective?: FormGroupDirective;

  constructor(private titleService:Title,private contactser:TeamcontactService
    ,private notser:NotificationService,private router: Router,private dialogService:DialogService,
    public service:EmpService ,private route: ActivatedRoute,
    ) {
    // Create 100 users
    this.titleService.setTitle('4G | Team Contact');

    this.route.queryParams.subscribe((params:any) => {
    
      this.param1 = params['team'];    
      this.teamname = params['name'];    
      if(this.param1!=undefined){
   this.settingtype=this.param1;
   this.getRequestdata(this.param1);
      }
      else   
      {
        
       this.router.navigate(['/'] );

       }
      });
   
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort as MatSort; 
   this.dataSource.paginator = this.paginator as MatPaginator;
   
  }
  simflag=true;
  ngOnInit() {
   // this.getRequestdata("");  
   var teamval= localStorage.getItem("teamName");
    
   if(teamval?.toLocaleLowerCase()=='esp'){
  this.simflag=false;  
   
}
else{
  this.simflag=true;  

} 
if(this.simflag){
  this.notser.warn("not permission");
 this.router.navigate(['/'] );      

}
    this.service.onMessage().subscribe(x=>{
      this.contactser.delcontact(this.delconct.id).subscribe(
        res=>{debugger;
          
            if(res.status==true){
     
      const index1 = this.dataSource.data.indexOf(this.delconct);
this.dataSource.data.splice(index1, 1);
this.dataSource._updateChangeSubscription()
  
   this.notser.success("Deleted!") 
 
        }
            else {
             this.notser.warn("Not Deleted!")

            }
        },err=>{
          if(err.status==401)
      this.router.navigate(['/login']);
      else 
      this.notser.warn("! Fail");
     
        }
      )
    })
  }
  getRequestdata(attr:any ){
    
    this.contactser.contactattr(Number(attr)).subscribe(res=>{
      this.loading = false;
      
      if(res.status==true){
        
        this.loading = false;
     debugger;
     this.contactList = res.result?.data;
   this.apply('')
   
      }else this.notser.warn(res.error);
    },err=>{
      
      if(err.status==401)
      this.router.navigate(['/login'] );
      else 
      this.notser.warn("! Fail");
     
     
    })
   }
  onSearchClear(){
    this.searchKey ='';
    //this.applyFilter();
   
    if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
    }
  }
  // applyFilter(){ 
  //   this.dataSource.filter=this.searchKey.trim().toLowerCase();
    
  // }
  apply(filterValue:string) {
     
    this.selected=true;
    this.listName=filterValue;
    this.contactListTab=[];
    this.contactListTab=this.contactList;
  
  this.setReactValue(Number(0),"",'to');

    this.dataSource =new MatTableDataSource<any>(this.contactListTab);
      
    this.dataSource.paginator = this.paginator as MatPaginator;
    
   
  }
  applyFilter(filterValue: Event) { 
    
    this.dataSource.filter =(<HTMLInputElement>filterValue.target).value.trim().toLowerCase();
   
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onEdit(r:any){
  
    
    this.valdata=r.mail;
    this.valuid=r.id;
    if(r.type !=null)
    this.setReactValue(Number(r.id),r.mail,r.type);
    else 
    this.setReactValue(Number(r.id),r.mail,'to');

 
  }

  form: FormGroup = new FormGroup({
    id: new FormControl(0),
    mail: new FormControl('',[Validators.required,Validators.email]),
    type: new FormControl('to'),
        
  });//18
  isDisable=false;
  onSubmit() {
    // 
   this.isDisable=true;
      if (this.form.invalid||this.form.value.value==' ') {
        //   this.setReactValue(Number(0),"",'to');  
           this.isDisable=false;

          return;

      } 
      
   debugger;
      var listval:contactTeam=new contactTeam();
      listval.mail=this.form.value.mail;
      listval.teamId= Number(this.param1); 
      listval.type=this.form.value.type;
      if(this.form.value.id==0||this.form.value.id==null||this.form.value.id==undefined){
        var pickData= this.contactListTab?.find(x=>x.mail==this.form.value.mail.trim());
        if(pickData)
        {
         this.setReactValue(Number(0),"",'to');  
         this.isDisable=false;

          this.notser.warn("mail already exist");
          return;
        }     
      this.contactser.addcontact(listval).subscribe((res)=>{
           this.isDisable=false;
        
      if(res.status==true)    {
        var pick:contactTeam=new contactTeam();
        pick.teamId=res.data?.teamId;
        pick.id=res.data?.id;
        pick.mail=res.data?.mail;
        pick.type=res.data?.type;
        this.contactListTab?.push(pick)
        this.dataSource =new MatTableDataSource<any>(this.contactListTab);
      
    this.dataSource.paginator = this.paginator as MatPaginator;
      this.notser.success("Added!") ;
      this.formGroupDirective?.resetForm();  
      // this.form.markAsPristine();
      // this.form.markAsUntouched();
       
       
      }
      else{
      this.notser.warn("Not Added!") ;
  
      }
      },err=>{
        this.isDisable=false;
        if(err.status==401)
      this.router.navigate(['/login'] );
      else 
      this.notser.warn("! Fail");
     
  
      }); 
    }
    else{
      var pickData= this.contactListTab?.find(x=>x.mail==this.form.value.mail.trim());
      if(pickData &&pickData.id !=this.form.value.id)
      {
           this.isDisable=false;
           this.setReactValue(Number(0),"",'to');  
        this.notser.warn("value already exist");
        return;
      } 
     listval.id=Number(this.form.value.id);
      this.contactser.editcontact(listval).subscribe((res)=>{
           this.isDisable=false;
          
        if(res.status==true)    {
         
       this.contactListTab?.forEach(x=>
        {
          if(x.id==res.data?.id){
          x.mail=res.data?.mail;x.type=res.data?.type;
          }
        });
        this.dataSource =new MatTableDataSource<any>(this.contactListTab);
      
    this.dataSource.paginator = this.paginator as MatPaginator;
    this.formGroupDirective?.resetForm();  

    
          this.notser.success("saved!") ;
         
          }
          else{
          this.notser.warn("Not saved!") ;
      
          }
  
      },err=>{
        this.isDisable=false;
        if(err.status==401)
        this.router.navigate(['/login']);
        else 
        this.notser.warn("! Fail");
       
  
  
      });
    }
  }
  setReactValue(id:number,val:any,num:any){
    this.form.patchValue({
      id: id,
      mail:val,
      type:num
    });
  
 }
 onDelete(r:any){
  this.delconct=r as any;
  this.dialogService.openConfirmDialog().afterClosed().subscribe(res=>{
  
    
  });
}     
}

