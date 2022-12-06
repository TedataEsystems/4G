 
import {Component, ViewChild , OnInit,ElementRef ,TemplateRef,Input, Output, EventEmitter } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator,PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
//import { EmpformComponent } from '../empform/empform.component';
import { EmpService } from 'src/app/shared/services/emp.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { RequestSerService } from 'src/app/shared/services/request-ser.service';
import { RequestCls } from 'src/app/Model/RequestCls';
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
  selector: 'app-dmvpnrequest',
  templateUrl: './dmvpnrequest.component.html',
  styleUrls: ['./dmvpnrequest.component.css'],
  animations: [
    trigger('fadeInOut', [
          state('in', style({ opacity: 100 })),
          transition('* => void', [
                animate(300, style({ opacity: 0 }))
          ])
    ])
]
})
export class DMVPNRequestComponent implements OnInit {
 searchKey:string ='' ;
 reqtype='dmvpn';


  constructor(private dialog: MatDialog,public service:EmpService ,
    private dialogService:DialogService,private reqser: RequestSerService ,
    private route: ActivatedRoute,
    private router: Router, private notser:NotificationService,

    private titleService : Title,
    private config: ConfigurationService,
    private _http: HttpClient,
    private _bottomSheet: MatBottomSheet
    )
  {
    this.config.IsAuthentecated();
    this.titleService.setTitle('4G | Dm-VPN-Request');
    
     
 
  }
 public Requetss:any[]=[];
 loading: boolean = true;
  @ViewChild(MatSort) sort?:MatSort ;
  @ViewChild(MatPaginator) paginator?:MatPaginator ;

 
displayedColumns2: string[] = ['id','action',"sim", 'customerConnectionRequestType','customerName',"orderTypeId","mainOrder","backupMainOrder",
'backupOrder','ipAllocationId',"forecastId","forecastNumber","noOfSIMs",'tunnelWANIpAddressFromCustomer',
"confirmedTunnelIpNotDuplicatedId",'requestedQuota',"billingApprovalConfirmationId",'vrfId','oldECRMNumber', 
'contracttypeId','vrfDetails','casePeriority','loopbackIPAddress',
'apnName','currentstatusId','usedTestSimDataSerialId','generalComment'
,'creationDate','modificationDate','createdBy','modifyiedBy','createdByTeam','modifyiedByTeam'
];
 public reqs:RequestCls[]=[];
 public delreq:RequestCls=new RequestCls();

 dataSource = new MatTableDataSource<any>();
 sortColumnDef:string="id";
 SortDirDef:string='ASC';
 pagesizedef:number=25;
 pageIn=0;
 previousSizedef=25;
simflag=true;
adminflag=true;adminCreateflag=true;
  // searchKey!:string; DESC
  
  ngOnInit(){ 
     
this.getRequestdata(25,1,'',this.service.colname,this.service.coldir)
     this.service.onMessage().subscribe(x=>{
       if(this.delreq.id!=0){   
       this.reqser.delReqest(this.delreq.id).subscribe(
         res=>{
         
             if(res.status==true){
              // const index2 = this.Requetss.indexOf(this.delreq);
              // this.Requetss.splice(index2, 1);

              // this.dataSource =new MatTableDataSource<any>(this.Requetss);
              // this.dataSource._updateChangeSubscription(); 
              
              // this.dataSource.paginator = this.paginator as MatPaginator;
                                 
             this.notser.success("Deleted!")  
              window.location.reload();
         }
             else {
              setTimeout(() => {
                this.notser.warn("Not Deleted!")
              
           }, 5000)

             }
         },err=>{
          if(err.status==401)
      this.router.navigate(['/login'], { relativeTo: this.route });
      else 
      this.notser.warn("! Fail");
     
         }
       )
        }
     })
     var teamval= localStorage.getItem("teamName");
   if(teamval?.toLocaleLowerCase()=='epm'){
      this.simflag=false;  
      this.adminCreateflag=false;
   }
   else if(teamval?.toLocaleLowerCase()=='presales'){
//  this.adminCreateflag=false;
 this.simflag=true;  
     
 }
 else if(teamval?.toLocaleLowerCase()=='esp'){
  this.simflag=false;  
 this.adminflag=false;
 this.adminCreateflag=false;
   
}
else{
  this.simflag=true;  

}  
  }
 getRequestdata(pageSize:number,pageNum:number ,search:string,sortColumn:string,sortDir:string){
  this.loading = true;

  this.reqser.getReqestOption(this.reqtype,pageSize,pageNum,search,sortColumn,sortDir).subscribe(res=>{
    if(res.status==true)
    {
      
   //   this.dataSource.paginator.length=10;
   this.Requetss = res.result.data;
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
 
  this.reqser.getReqestOption(this.reqtype,pageSize,pageNum,search,sortColumn,sortDir).subscribe(res=>{
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
   
   // this.dataSource.paginator = this.paginator as MatPaginator;
   
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
      this.delreq=r as RequestCls;
      this.dialogService.openConfirmDialog().afterClosed().subscribe(res=>{
      
        if(res)
        alert(this.delreq.id);
      });
    }

 ///Export excel/////////////////////////////////////////
 @ViewChild('TABLE') table?: ElementRef;

    // ExportTOExcel()
    // {
    //   const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet((this.table as ElementRef).nativeElement);
    //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
    //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      
    //   /* save to file */
    //   XLSX.writeFile(wb, 'SheetJS.xlsx');
      
    // }
////////////////import file/////////////////////////////////////

 /** Link text */
 @Input() text = 'Upload';
 /** Name used in form which will be sent in HTTP request. */
 @Input() param = 'file';
 /** Target URL for file uploading. */
 @Input() target = 'https://file.io';
 /** File extension that accepted, same as 'accept' of <input type="file" />. 
     By the default, it's set to 'image/*'. */
 @Input() accept = 'image/*';
 /** Allow you to add handler after its completion. Bubble up response text from remote. */
 @Output() complete = new EventEmitter<string>();

 public files: Array<FileUploadModel> = [];

/** ul list of file uploded */
//@ViewChild(TemplateRef) template!:TemplateRef<any>;
@ViewChild('LIST') template!:TemplateRef<any>;

 onClick() {
  const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
  
  fileUpload.onchange = () => {
    if(fileUpload.files != null){ 
        for (let index = 0; index < fileUpload.files.length; index++) {
              const file = fileUpload.files![index];
              this.files.push({ data: file, state: 'in', 
                inProgress: false, progress: 0, canRetry: false, canCancel: true });
        }
        this.uploadFiles();
      }
  };
  fileUpload.click();
}

cancelFile(file: FileUploadModel) {
  if(file.sub){
  file.sub.unsubscribe();
  this.removeFileFromArray(file);
}
}

retryFile(file: FileUploadModel) {
  this.uploadFile(file);
  file.canRetry = false;
}

private uploadFile(file: FileUploadModel) {
  const fd = new FormData();
  fd.append(this.param, file.data);

  const req = new HttpRequest('POST', this.target, fd, {
        reportProgress: true
  });

  file.inProgress = true;
  file.sub = this._http.request(req).pipe(
        // map(event => {
        //       switch (event.type) {
        //             case HttpEventType.UploadProgress:
        //               if (event.total){ 
        //                 file.progress = Math.round(event.loaded * 100 / event.total);
        //                return file.progress;
        //               }
        //               break;
        //             case HttpEventType.Response:
        //               return event;
        //       }
        // }),
        map(event => {
          if (event.type === HttpEventType.UploadProgress && event.total){
            file.progress = Math.round(event.loaded * 100 / event.total);

          }
          else if(event.type === HttpEventType.Response){
           
          }
        }),
       
        tap(message => { }),
        last(),
        catchError((error: HttpErrorResponse) => {
              file.inProgress = false;
              file.canRetry = true;
              return of(`${file.data.name} upload failed.`);
        })
  ).subscribe(
        (event: any) => {
              if (typeof (event) === 'object') {
                    this.removeFileFromArray(file);
                    this.complete.emit(event.body);
              }
        }
  );
  this._bottomSheet.open(this.template);

}
close(){
  this._bottomSheet.dismiss();
}

private uploadFiles() {
  const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
  fileUpload.value = '';

  this.files.forEach(file => {
        this.uploadFile(file);
  });
}

private removeFileFromArray(file: FileUploadModel) {
  const index = this.files.indexOf(file);
  if (index > -1) {
        this.files.splice(index, 1);
  }
}


    // openModal(){
    //   this.service.initializeFormGroup();
    //   const dialogGonfig = new MatDialogConfig();
    //   dialogGonfig.disableClose=true;
    //   dialogGonfig.autoFocus= true;
    //   dialogGonfig.width="50%";
    //   dialogGonfig.panelClass='modals-dialog';
    //   this.dialog.open(EmpformComponent,dialogGonfig);
    // } 

}

export interface FileUploadModel {
  data: File;
  state: string;
  inProgress: boolean;
  progress: number;
  canRetry: boolean;
  canCancel: boolean;
  sub?: Subscription;
}