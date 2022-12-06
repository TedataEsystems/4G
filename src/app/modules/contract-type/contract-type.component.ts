
import {Component,Input,NgModule, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { NotificationService} from 'src/app/shared/services/notification.service';
import { Title } from '@angular/platform-browser';
import { ContractTypeService } from 'src/app/shared/services/contract-type.service';
import {FormControl, Validators} from '@angular/forms';
import { PickList } from 'src/app/Model/PickList';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { EmpService } from 'src/app/shared/services/emp.service';
 
import {FormGroup} from '@angular/forms';
import { ConfigurationService } from 'src/app/shared/services/configuration.service';
import { ActivatedRoute, Router } from '@angular/router';
 

@Component({
  selector: 'app-contract-type',
  templateUrl: './contract-type.component.html',
  styleUrls: ['./contract-type.component.css']
})
export class ContractTypeComponent implements OnInit {

  displayedColumns: string[] = ['id', 'value', 'orderInList', 'action'];
    columnsToDisplay: string[] = this.displayedColumns.slice();
pickList?:PickList[]=[];
pickListTab?:PickList[]=[];
valdata="";valuid=0;
dataSource = new MatTableDataSource<any>();
delpic:any;
  searchKey:string ='';
  listName:string ='';
  loading: boolean = true;
  selected: boolean = false;
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  param1='';settingtype=' Contract Type';
  constructor(private titleService:Title,private pickser:ContractTypeService
    ,private notser:NotificationService,private router: Router,private dialogService:DialogService,
    public service:EmpService ,private route: ActivatedRoute,
    ) {
    // Create 100 users
    this.titleService.setTitle('4G | Contract Type');
     
   
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort as MatSort; 
   this.dataSource.paginator = this.paginator as MatPaginator;
   
  }
  simflag=true;
  ngOnInit() {
    this.getRequestdata("");  
    this.service.onMessage().subscribe(x=>{
      this.pickser.delContractType(this.delpic.id).subscribe(
        res=>{
          
            if(res.status==true){
     
      const index1 = this.dataSource.data.indexOf(this.delpic);
this.dataSource.data.splice(index1, 1);
this.dataSource._updateChangeSubscription()
   //  this.dataSource =new MatTableDataSource<any>(this.Requetss);
   //this.dataSource._updateChangeSubscription(); 
   // this.dataSource.paginator = this.paginator as MatPaginator;
   this.notser.success("Deleted!") 
  // window.location.reload();
        }
            else {
             this.notser.warn(res.error)

            }
        },err=>{
          if(err.status==401)
      this.router.navigate(['/login']);
      else 
      this.notser.warn("! Fail");
     
        }
      )
    })
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
  }
  getRequestdata(attr:any ){
    
    this.pickser.getContractType().subscribe(res=>{
      this.loading = false;
      
      if(res.status==true){   
     this.pickList = res.result?.data;
     this.apply(this.param1);
   
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
    this.pickListTab=[];
    this.pickListTab=this.pickList;
 
  this.setReactValue(Number(0),"",0);
  this.pickListTab?.sort(function(a, b) {
    let oa=0;
    if(a.orderInList !=null)
     oa=a.orderInList; 
    let ob=0;
    if(b.orderInList !=null)
     ob=b.orderInList;

    return oa - ob ; 
  }); 
  this.dataSource =new MatTableDataSource<any>(this.pickListTab);
      
    this.dataSource.paginator = this.paginator as MatPaginator;
    
   
  }
  applyFilter(filterValue: Event) { 
     
    this.dataSource.filter =(<HTMLInputElement>filterValue.target).value.trim().toLowerCase();
   
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onEdit(r:any){
  
    
    this.valdata=r.value;
    this.valuid=r.id;
    if(r.orderInList !=null)
    this.setReactValue(Number(r.id),r.value,r.orderInList);
    else 
    this.setReactValue(Number(r.id),r.value,0);

//this.router.navigate(['/Simdetail'],{ queryParams: {id: r.id}});
 
  }
  form: FormGroup = new FormGroup({
    id: new FormControl(0),
    value: new FormControl('',[Validators.required]),
    orderInList: new FormControl(0),
        
  });//18
  isDisable=false;

  onSubmit() {
    // 
   this.isDisable=true;
      if (this.form.invalid||this.form.value.value==' ') {
        if (this.form.value.value==' ')
         this.setReactValue(Number(0),"",0);  
         this.isDisable=false;
          return;
      } 
      
   debugger;
      var listval:PickList=new PickList();
      listval.value=this.form.value.value;
       
      listval.orderInList=this.form.value.orderInList;
      if(this.form.value.id==0||this.form.value.id==null||this.form.value.id==undefined){
        var pickData= this.pickListTab?.find(x=>x.value==this.form.value.value.trim());
        if(pickData)
        {
         this.isDisable=false;
         this.setReactValue(Number(0),"",0);  
          this.notser.warn("value already exist");
          return;
        }     
      this.pickser.addContractType(listval).subscribe((res)=>{
         this.isDisable=false;
         
      if(res.status==true)    {
        var pick:PickList=new PickList();
        
        pick.id=res.data?.id;
        pick.value=res.data?.value;
        pick.orderInList=res.data?.orderInList;
        this.pickListTab?.push(pick)
        this.pickListTab?.sort(function(a, b) {
          let oa=0;
          if(a.orderInList !=null)
           oa=a.orderInList; 
          let ob=0;
          if(b.orderInList !=null)
           ob=b.orderInList;
      
          return oa - ob ; 
        }); 
        this.dataSource =new MatTableDataSource<any>(this.pickListTab);
      
    this.dataSource.paginator = this.paginator as MatPaginator;
      this.notser.success("Added!") ;
      this.setReactValue(Number(0)," ",0);  
 
       
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
      var pickData= this.pickListTab?.find(x=>x.value==this.form.value.value.trim());
      if(pickData &&pickData.id !=this.form.value.id)
      {
        this.isDisable=false;

       this.setReactValue(Number(0),"",0);  
        this.notser.warn("value already exist");
        return;
      } 
     listval.id=Number(this.form.value.id);
      this.pickser.editContractType(listval).subscribe((res)=>{
         this.isDisable=false;     
        if(res.status==true)    {         
       this.pickListTab?.forEach(x=>
        {
          if(x.id==res.data?.id){
          x.value=res.data?.value;x.orderInList=res.data?.orderInList;
          }
        });
        this.pickListTab?.sort(function(a, b) {
          let oa=0;
          if(a.orderInList !=null)
           oa=a.orderInList; 
          let ob=0;
          if(b.orderInList !=null)
           ob=b.orderInList;
      
          return oa - ob ; 
        }); 
        this.dataSource =new MatTableDataSource<any>(this.pickListTab);
      
    this.dataSource.paginator = this.paginator as MatPaginator;
   this.setReactValue(Number(0)," ",0);
 
    
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
      value:val,
      orderInList:num
    });
  
 }
 onDelete(r:any){
  this.delpic=r as any;
  this.dialogService.openConfirmDialog().afterClosed().subscribe(res=>{
  
    if(res)
    alert(this.delpic.id);
  });
}     
}
