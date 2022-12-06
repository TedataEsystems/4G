
import {Component, ViewChild, ElementRef , OnInit,TemplateRef,Input,Output, EventEmitter} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator,PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog,MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import { EmpformComponent } from '../empform/empform.component';
import { EmpService } from 'src/app/shared/services/emp.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { RequestSerService } from 'src/app/shared/services/request-ser.service';
import { RequestCls } from 'src/app/Model/RequestCls';
import { simdataModel } from 'src/app/Model/simdatacls';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService} from 'src/app/shared/services/notification.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { SimdataService } from 'src/app/shared/services/simdata.service';

import { ConfigurationService } from 'src/app/shared/services/configuration.service';
import { saveAs } from 'file-saver';

import { Title } from '@angular/platform-browser';
import * as XLSX from 'xlsx'; 
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpClient, HttpResponse, HttpRequest, HttpEventType, HttpErrorResponse } from '@angular/common/http';
 import { Subscription } from 'rxjs';
 import { of } from 'rxjs';
 import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';

//  import { of } from 'rxjs/observable/of';
import { catchError, last, map, tap, } from 'rxjs/operators';
import { NullTemplateVisitor } from '@angular/compiler';
declare var require: any;
import Swal from 'sweetalert2';
import { createTrue } from 'typescript';

const swal = require('sweetalert2')


@Component({
  selector: 'app-all-sim',
  templateUrl: './all-sim.component.html',
  styleUrls: ['./all-sim.component.css'],
  animations: [
    trigger('fadeInOut', [
          state('in', style({ opacity: 100 })),
          transition('* => void', [
                animate(300, style({ opacity: 0 }))
          ])
    ])
]
})
export class AllSimComponent implements OnInit {
 searchKey:string ='' ;pcflag=false;dmflag=false;
  constructor(private dialog: MatDialog,public service:EmpService ,
    private dialogService:DialogService,private reqser: RequestSerService ,
    private route: ActivatedRoute,
    private router: Router, private notser:NotificationService,
    private config: ConfigurationService,
    private simser:SimdataService, private titleService : Title,private _http: HttpClient,
    private _bottomSheet: MatBottomSheet
    )
   { 
     this.config.IsAuthentecated();   
      this.titleService.setTitle('4G | AllSimData');
   var req=   sessionStorage.getItem('simkey');//dmv
     if(req=='dmv')
     this.dmflag=true;
     if(req=='pc')
     this.pcflag=true;
  }
 public Requetss:any[]=[];
 loading: boolean = true;
  @ViewChild(MatSort) sort?:MatSort ;
  @ViewChild(MatPaginator) paginator?:MatPaginator ;
 //http://172.29.29.8:2021/api/simdata/DownloadEmptyExcel
 //AddFromFile 
 
 
displayedColumns2: string[] = ['id','action', 'apnType','simStatus', /**/'new_OldId','orderID','customerName','vrfName',
 'simPoolSubnetTunnelSubnet',/**/'forecastId',/**/'percentageOfSimUsage',"destinationIpsLoopbackIP",
'simSerial','dialNumber','imsiNumber',/**/'forecastPercentage','apnName','simipTunnelIp','problemId',
'coreCommentId','epmCommentId','consultancyCommentId','comment','requestId',
'creationDate','modificationDate','createdBy','modifyiedBy','createdByTeam' ,'modifyiedByTeam',
];
 public reqs:simdataModel[]=[];
 public delreq:simdataModel=new simdataModel();

 dataSource = new MatTableDataSource<any>();
 sortColumnDef:string="id";
 SortDirDef:string='ASC';
 pagesizedef:number=25;
 pageIn=0;
 previousSizedef=25;
 requestid:any;
 poolid:any;
 poolidval:any;
 reqPools:any[]=[];
  // searchKey!:string; DESC reqid
  selected: boolean = false;
  simflag=true;
  ngOnInit(){
    var teamval= localStorage.getItem("teamName");
    if(teamval?.toLocaleLowerCase()=='epm'){
       this.simflag=true;  
        
    }
    else if(teamval?.toLocaleLowerCase()=='presales'){
     this.simflag=true;  
      
  }
  else if(teamval?.toLocaleLowerCase()=='operation'){
    this.simflag=true;     
 }
  else if(teamval?.toLocaleLowerCase()=='esp'){
   this.simflag=false;  
    
 }
 else{
   this.simflag=true;  
 
 } 
 if(this.simflag){
  //  this.notser.warn("not permission");
  //  this.router.navigate(['/'] );      

 }
    this.getRequestdata(25,1,'',this.service.colname,this.service.coldir);
     
    
     this.service.onMessage().subscribe(x=>{
      if(this.delreq.id!=0){ 
       this.simser.delSimData(this.delreq.id).subscribe(
         res=>{
         
             if(res.status==true){
 
    this.notser.success("Deleted!") 
    var url = window.location.href;     
   url += '&poolsid='+this.poolid;
 
window.location.href = url;
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
          this.notser.warn("! Fail")
         

         }
       )
      }
     })
    
  }
   
 getRequestdata(pageSize:number,pageNum:number ,search:string,sortColumn:string,sortDir:string){
  this.loading = true;
 
  this.simser.getAllSimDataOption(pageSize,pageNum,search,sortColumn,sortDir).subscribe(res=>{
    this.loading = false;
  
    if(res.status==true){
      
      this.loading = false;
   //   this.dataSource.paginator.length=10;
   this.Requetss = res.result.data;
   this.Requetss.length = res.result.totalrecords;
   this.dataSource =new MatTableDataSource<any>(this.Requetss);
   //this.dataSource._updateChangeSubscription();
   this.dataSource.paginator = this.paginator as MatPaginator;
    }
    else
    this.notser.warn(res.error)
  },err=>{
    
    if(err.status==401)
  this.router.navigate(['/login'], { relativeTo: this.route });
  else 
  this.notser.warn("! Fail")
  this.loading = false;
 

     
  })
 }
 getRequestdataNext(cursize:number,pageSize:number,pageNum:number ,search:string,sortColumn:string,sortDir:string){
  this.loading = true;
  
  this.simser.getAllSimDataOption(pageSize,pageNum,search,sortColumn,sortDir).subscribe(res=>{
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
    else 
    this.notser.warn(res.error)
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
    //  let previousSize = pageSize * pageIndex; 
    //  this.getNextData(previousSize, (pageIndex).toString(), pageSize.toString());
    }
    onSearchClear(){
      this.searchKey ='';
      this.applyFilter();
    }
    applyFilter(){ 
     
  //    this.dataSource.filter=this.searchKey.trim().toLowerCase();
      let searchData=this.searchKey.trim().toLowerCase();
//
    //  if(searchData !="")
     this.getRequestdata(25,1,searchData,"","");

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
  //   onCreate(){//this.requestid
  // this.router.navigate(['/Simdetail'],{ queryParams: {reqid: this.requestid,poolid:this.poolid}} );      
  //   }

    onEdit(r:any){     
  this.router.navigate(['/Simdetail'],{ queryParams: {id: r.id}});
    }
    onDelete(r:any){
      this.delreq=r as simdataModel;
      this.dialogService.openConfirmDialog().afterClosed().subscribe(res=>{
      
        if(res)
        alert(this.delreq.id);
      });
    }
   
////////////////Export excel/////////////////////////////////////////
@ViewChild('TABLE') table?: ElementRef;

// ExportTOExcel()
// {
//   // const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet((this.table as ElementRef).nativeElement);
//   // const wb: XLSX.WorkBook = XLSX.utils.book_new();
//   // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
//   this.simser.getSimDataEXel().subscribe(res=>{
    
//     const blob = new Blob([res], { type : 'application/vnd.ms.excel' });
//     const file = new File([blob],  'simdata' + '.xlsx', { type: 'application/vnd.ms.excel' });
//     saveAs(file);
    
//   },err=>{
//     if(err.status==401)
//     this.router.navigate(['/login'], { relativeTo: this.route });
//     else 
//     this.notser.warn("! Fail")
   
//   });
//   /* save to file */ 
//   //XLSX.writeFile(wb, 'SheetJS.xlsx');
  
// }
exportExcel(){
  let searchData=this.searchKey.trim().toLowerCase();

  this.simser.getAllSimDataEXel(searchData).subscribe(res=>{
    
    const blob = new Blob([res], { type : 'application/vnd.ms.excel' });
    const file = new File([blob],  'simdata' +new Date().toLocaleString()+ '.xlsx', { type: 'application/vnd.ms.excel' });
    saveAs(file);
    
  },err=>{
    if(err.status==401)
    this.router.navigate(['/login'], { relativeTo: this.route });
    else 
    this.notser.warn("! Fail")
   
  });
}
////////////////import file/////////////////////////////////////
 
// @Input() param = 'file'; 
 
@ViewChild('LIST') template!:TemplateRef<any>;
 @ViewChild('fileInput',{static: false}) fileInput?: ElementRef;
  fileAttr = 'Choose File';
fileuploaded:any;//

//   uploadFileEvt(imgFile: any) {
//     this.fileuploaded = imgFile.target.files[0];

//     console.log(this.fileuploaded);
    
//     if (imgFile.target.files && imgFile.target.files[0]) {
//       this.fileAttr = '';
//       Array.prototype.forEach.call(imgFile.target.files, (file) => { 
//         this.fileAttr += file.name + ' - ';
//       }); 
//       // Array.from(imgFile.target.files).forEach((file:File)=> {
//       //   this.fileAttr += file.name + ' - ';

//       // });
     
     

//       // HTML25 FileReader API
//       let reader = new FileReader();
//       reader.onload = (e: any) => {
//         let image = new Image();
//         image.src = e.target.result;
//         image.onload = rs => {
//           let imgBase64Path = e.target.result;
//         };
//       };
//       reader.readAsDataURL(imgFile.target.files[0]);
      
//       // Reset if duplicate image uploaded again
//       (this.fileInput as ElementRef).nativeElement.value = "";
//     } else {
//       this.fileAttr = 'Choose File';
//     }
//   }
   
    
    
//      upLoad(){
//     //code
//     // var uploadedData = {requestId:Number(this.requestid), file:this.fileuploaded};

//     //close bottom 
//     const fd = new FormData();
//     debugger;
     
//     fd.append(this.param, this.fileuploaded);
      
//     this.simser.addSimfile(fd,this.requestid,this.poolid).subscribe(x=>{
      
//       if(x.status==true){
    
//     this.getRequestdata(25,1,'',this.service.colname,this.service.coldir);
             
//     this._bottomSheet.dismiss();
//     swal.fire(
//       '!uploaded ',
//       x.data,
//       'success'
//     )

//   } else{
//     swal.fire(
//       '!not uploaded ',
//       x.error,
//       'error'
//     )
//   }
//   this.resetfile();

//     },err=>{
//       if(err.status==401)
//       this.router.navigate(['/login'], { relativeTo: this.route });
//       else 
//       this.notser.warn("! Fail")
   
//  this.resetfile();
         
//     })
//   }
//   openBottomSheet(){
//     if(this.poolid==undefined){
//       this.notser.warn("you must select pool");
// return;
//     }
//   this._bottomSheet.open(this.template,{
//       panelClass:'botttom-dialog-container',
//       disableClose: true
     
    
//   });
  
//   }

// close(){
//  this.resetfile();
// this._bottomSheet.dismiss();
// //  this.dialogRef.close();
// }
 

resetfile() { 
  
  this.fileAttr = 'Choose File';

 // (this.fileInput as ElementRef).nativeElement.value = "";

  
}

}



