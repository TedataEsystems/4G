
import {Component, ViewChild , OnInit,ElementRef ,TemplateRef,Input, Output, EventEmitter } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator,PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
//import { EmpformComponent } from '../empform/empform.component';
import { EmpService } from 'src/app/shared/services/emp.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { APNConclusionService } from 'src/app/shared/services/apnconclusion.service';
import { apnConclusion } from 'src/app/Model/APNConclusion';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService} from 'src/app/shared/services/notification.service';
//import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Title } from '@angular/platform-browser';
//import * as XLSX from 'xlsx';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpClient, HttpResponse, HttpRequest, HttpEventType, HttpErrorResponse } from '@angular/common/http';
 import { Subscription } from 'rxjs';
 import { of } from 'rxjs';
 import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
 import { ConfigurationService } from 'src/app/shared/services/configuration.service';

//  import { of } from 'rxjs/observable/of';
import { catchError, last, map, tap, } from 'rxjs/operators';

@Component({
  selector: 'app-apnconclusion',
  templateUrl: './apnconclusion.component.html',
  styleUrls: ['./apnconclusion.component.css'],
  animations: [
    trigger('fadeInOut', [
          state('in', style({ opacity: 100 })),
          transition('* => void', [
                animate(300, style({ opacity: 0 }))
          ])
    ])
]
})
export class APNConclusionComponent implements OnInit {
 searchKey:string ='' ;
 reqtype='dmvpn';


  constructor(private dialog: MatDialog,public service:EmpService ,
    private dialogService:DialogService,private reqser: APNConclusionService ,
    private route: ActivatedRoute,
    private router: Router, private notser:NotificationService,

    private titleService : Title,
    private config: ConfigurationService,
    private _http: HttpClient,
    private _bottomSheet: MatBottomSheet
    )
  {
    this.config.IsAuthentecated();
    this.titleService.setTitle('4G | APN Conclusion');
    
     
 
  }
 public Requetss:any[]=[];
 loading: boolean = true;
  @ViewChild(MatSort) sort?:MatSort ;
  @ViewChild(MatPaginator) paginator?:MatPaginator ;

 //vrfName
displayedColumns2: string[] = ['id','requestId', 'customerName', 'serviceTypeId', 'new_old'
,'apnName','vrfName','usedTestSimDataSerialId',
'receivingDate','sentToOperationDate','receivedFromOperationDate','operationDuration','workingDate'
,'fullDuration', 'currentstatusId',"apnWorkedFrom1stTestId",'comments',"tunnelDST","loopBack","mainBackUp",
'creationDate','createdBy','createdByTeam' 
];
 public reqs:apnConclusion[]=[];
 public delreq:apnConclusion=new apnConclusion();

 dataSource = new MatTableDataSource<any>();
 sortColumnDef:string="id";
 SortDirDef:string='ASC';
 pagesizedef:number=25;
 pageIn=0;
 previousSizedef=25;
simflag=true;
adminflag=true;
  // searchKey!:string; DESC
  
  ngOnInit(){ 
     
this.getRequestdata(25,1,'',this.service.colname,this.service.coldir)
     this.service.onMessage().subscribe(x=>{
       this.reqser.delApnConClusion(this.delreq.id).subscribe(
         res=>{
         
             if(res.status==true){
         
                                 
             this.notser.success("Deleted!")  
              window.location.reload();
         }
             else {
              this.notser.warn("Not Deleted!")

             }
         },err=>{
          if(err.status==401)
      this.router.navigate(['/login'], { relativeTo: this.route });
      else 
      this.notser.warn("! Fail");
     
         }
       )
     })
     var teamval= localStorage.getItem("teamName");
   if(teamval?.toLocaleLowerCase()=='epm'){
     ;  
       
   }
   else if(teamval?.toLocaleLowerCase()=='presales'){
     
     
 }
  if(teamval?.toLocaleLowerCase()=='esp'){
  this.simflag=false;  
 this.adminflag=false;
   
}

else{
  this.simflag=true;  

} 
if(this.simflag){
//   this.notser.warn("not permission");
//  this.router.navigate(['/'] );      

} 
  }
  exportExcel(){
    let searchData=this.searchKey.trim().toLowerCase();
  
    this.reqser.getAllSimDataEXel(searchData).subscribe(res=>{
      
      const blob = new Blob([res], { type : 'application/vnd.ms.excel' });
      const file = new File([blob],  'APNConClusion' +new Date().toLocaleString()+ '.xlsx', { type: 'application/vnd.ms.excel' });
      saveAs(file);
      
    },err=>{
      if(err.status==401)
      this.router.navigate(['/login'], { relativeTo: this.route });
      else 
      this.notser.warn("! Fail")
     
    });
  }
 getRequestdata(pageSize:number,pageNum:number ,search:string,sortColumn:string,sortDir:string){
  this.loading = true;

  this.reqser.getApnConClusionOption(pageSize,pageNum,search,sortColumn,sortDir).subscribe(res=>{
    if(res.status==true)
    {
      
   //   this.dataSource.paginator.length=10;
   this.Requetss = res.result.data;
   console.log(this.Requetss);
   this.Requetss.length = res.result.totalrecords;
   this.dataSource =new MatTableDataSource<any>(this.Requetss);
   //this.dataSource._updateChangeSubscription();
   this.dataSource.paginator = this.paginator as MatPaginator;
    }
    else{
      this.notser.warn(res.error);
    }
    this.loading = false;

  },err=>{
    
    if(err.status==401)
  this.router.navigate(['/login'], { relativeTo: this.route });
else 
  this.notser.warn('!fail');
  this.loading = false;

    
  })
 }
 getRequestdataNext(cursize:number,pageSize:number,pageNum:number ,search:string,sortColumn:string,sortDir:string){
  this.loading = true;
 
  this.reqser.getApnConClusionOption(pageSize,pageNum,search,sortColumn,sortDir).subscribe(res=>{
    this.loading = false;
   
    if(res.status==true){
      
      this.loading = false;
   //   this.dataSource.paginator.length=10;
   this.Requetss.length = cursize;
   this.Requetss.push(...res.result.data);
   //this.Requetss = res.result.data;
   this.Requetss.length = res.result.totalrecords;
   this.dataSource =new MatTableDataSource<any>(this.Requetss);
   this.dataSource._updateChangeSubscription();
   this.dataSource.paginator = this.paginator as MatPaginator;
    }
    else this.notser.warn(res.error)
  },err=>{
    if(err.status==401)
    this.router.navigate(['/login'], { relativeTo: this.route });
    else 
    this.notser.warn("! Fail");
    this.loading = false;
   
  })
 } 
  ngAfterViewInit() {
    this.dataSource.sort = this.sort as MatSort; 
  }
    
    pageChanged(event:any){    
      this.loading = true;
       this.service.pIn=event.pageIndex;
this.pageIn=event.pageIndex;
this.pagesizedef=event.pageSize;
      let pageIndex = event.pageIndex;
      let pageSize = event.pageSize;
      let previousSize = pageSize * pageIndex;
      this.previousSizedef=previousSize;
this.getRequestdataNext(previousSize,pageSize,pageIndex+1,'',this.sortColumnDef,this.SortDirDef)
      let previousIndex = event.previousPageIndex; 

    }
    onSearchClear()
    {
      this.searchKey ='';
      this.applyFilter();
    }

    applyFilter()
    { 
      
      let searchData=this.searchKey.trim().toLowerCase();
      //if(searchData !="")
     this.getRequestdata(25,1,searchData,this.sortColumnDef,"asc");
    }
    lastcol:string='id';
    lastdir:string='asc';
        sortData(sort: any) {
          if(this.service.pIn!=0)
         window.location.reload();     
     if(this.lastcol==sort.active&&this.lastdir==sort.direction)
     {
       if(this.lastdir=='asc')
       sort.direction='desc';
       else 
       sort.direction='asc';
    
     }
     debugger;
     this.lastcol=sort.active;this.lastdir=sort.direction;
       
        var c= this.pageIn;
         this.getRequestdata(25,1,'',sort.active,this.lastdir);
          }
     
    onCreate(){
  this.router.navigate(['/request'] );      
    }

    onEdit(r:any){
     
  this.router.navigate(['/request'],{ queryParams: {id: r.id}});
   
    }
    
    onEditReq(r:any){ 
      sessionStorage.setItem('simkey','dmv');
     
  this.router.navigate(['/simdata'],{ queryParams: {reqid: r.id}});
   
    }
    onDelete(r:any){
      this.delreq=r as apnConclusion;
      this.dialogService.openConfirmDialog().afterClosed().subscribe(res=>{
      
        if(res)
        alert(this.delreq.id);
      });
    }

 

}

