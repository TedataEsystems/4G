 
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { from } from 'rxjs';
import { RequestCls } from 'src/app/Model/RequestCls';
import { PickList } from 'src/app/Model/PickList';

import { EmpService } from 'src/app/shared/services/emp.service';
import { Router, ActivatedRoute } from '@angular/router';
import{PickListSerService} from'src/app/shared/services/pick-list-ser.service'
import { NotificationService} from 'src/app/shared/services/notification.service';

import{RequestSerService} from'src/app/shared/services/request-ser.service'
import { ConfigurationService } from 'src/app/shared/services/configuration.service';
import { Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({ 
  selector: 'app-pc-connect-req-detail',
  templateUrl: './pc-connect-req-detail.component.html',
  styleUrls: ['./pc-connect-req-detail.component.css']
})
export class PcConnectReqDetailComponent implements OnInit {
 public reqData:RequestCls=new RequestCls(); 
 param1:any;
 appear= false;

 @ViewChild('loading1') img1?: ElementRef;

 public reqval:RequestCls=new RequestCls();
 public forcastList :PickList[]=[];
 public confirmSummaryList :any[]=[];
 public confirmPoolList :any[]=[];
 public statusList :any[]=[];
  iseditpage=false;
  public contractList :any[]=[];
 public simtestList :any[]=[];//newOldList
 public newOldList :any[]=[];//newOldList
  public ipAllocatedList :PickList[]=[];
  public periorList :PickList[]=[];
  public vrfList :PickList[]=[];
  public confirmList :PickList[]=[];
  //public statusList :PickList[]=[];
  public cusportList :PickList[]=[];
  public cusneedList :PickList[]=[];
  public custestList :PickList[]=[];

  vrfobj :PickList=new PickList() ;
  reqid:number=0;
  epmFlag:boolean=false;
  presalesFlag : boolean = false;
  espFlag:boolean=false;
  opFlag:boolean=false;
  commentFlag: boolean = true;
  saleFlag:boolean=false;
  readonlyFlag:boolean=false;
  constructor(private reqser:RequestSerService,public service :EmpService,
    private _route: ActivatedRoute,
    private _router: Router,private pickser:PickListSerService, private notser:NotificationService,
    private config: ConfigurationService,private titleService:Title
    )
   { 
     this.config.IsAuthentecated();
    this.titleService.setTitle('4G | PC-Connect-Request-Details');
    this._route.queryParams.subscribe((params:any) => {
    
      this.param1 = params['id'];    
      if(this.param1!=undefined){
        this.service.pcform.get("id")?.setValue(this.param1);
        this.reqser.getReqest(this.param1).subscribe((res)=>{
          
          if(res.status==true){
            this.iseditpage=true;
            this.commentFlag=false;
            this.reqval=res.data ;
            this.reqid=res.data?.id||0;
            
            if(this.reqval.ipPool==null||this.reqval.ipPool==""){
              this.iseditpage=false;
            }
            if(this.reqval.vrfId==4){
              this.oldflag=true;
            }
            if(this.reqval.vrfId==5){
              this.oldflag=false;
            }
            this.setReactValue(res.data);

       //     this.service.pcform.get('vrfId').setValue('valueFromServer'),
          }
          else this.notser.warn(res.error);
        },err=>{
          if(err.status==401)
          this._router.navigate(['/login'], { relativeTo: this._route });
          else 
          this.notser.warn("! Fail");
                   
        });
      }
      else 
      {
        this.param1=0;
       var tok= this.config.UserToken();
       if(tok==undefined){
       this._router.navigate(['/login'] );

       }
      }

  });
   }
  onSubmit() { debugger;
  //  this.submitted = true; 
  this.appear=true;
      
      (this.img1 as ElementRef).nativeElement.style.display="block";
    // stop here if pcform is invalid
    if (this.service.pcform.invalid) {
      this.appear=false;
 
        (this.img1 as ElementRef).nativeElement.style.display="none";
  
        return;
    }
 debugger;
    this.reqval=this.service.pcform.value;
    if(this.service.pcform.value.vrfId!=null) 
    this.reqval.vrfId=Number(this.service.pcform.value.vrfId); 
     if(this.service.pcform.value.billingApprovalConfirmationId!=null) 
    this.reqval.billingApprovalConfirmationId=Number(this.service.pcform.value.billingApprovalConfirmationId);
    if(this.service.pcform.value.ipAllocationId!=null) 
    this.reqval.ipAllocationId=Number(this.service.pcform.value.ipAllocationId);
    if(this.service.pcform.value.forecastId!=null) 
    this.reqval.forecastId=Number(this.service.pcform.value.forecastId);
    if(this.service.pcform.value.customerNeedOneWayOrTwoWaysDirectionsId!=null) 
    this.reqval.customerNeedOneWayOrTwoWaysDirectionsId=Number(this.service.pcform.value.customerNeedOneWayOrTwoWaysDirectionsId);
    if(this.service.pcform.value.customerNeedsSpecificPortOrAllowAnyId!=null) 
    this.reqval.customerNeedsSpecificPortOrAllowAnyId=Number(this.service.pcform.value.customerNeedsSpecificPortOrAllowAnyId);
  //////
  if(this.service.pcform.value.usedTestSimDataSerialId!=null) 
  this.reqval.usedTestSimDataSerialId=Number(this.service.pcform.value.usedTestSimDataSerialId);
  if(this.service.pcform.value.contracttypeId!=null) 
  this.reqval.contracttypeId=Number(this.service.pcform.value.contracttypeId);
  if(this.service.pcform.value.forecastNumber!=null) 
  this.reqval.forecastNumber=Number(this.service.pcform.value.forecastNumber);
  if(this.service.pcform.value.confirmedThatIpPoolNotDuplicatedId!=null) 
  this.reqval.confirmedThatIpPoolNotDuplicatedId=Number(this.service.pcform.value.confirmedThatIpPoolNotDuplicatedId); 
  if(this.service.pcform.value.currentstatusId!=null) 
    this.reqval.currentstatusId=Number(this.service.pcform.value.currentstatusId);
    if(this.service.pcform.value.confirmationSummaryApprovedFromCSTId!=null) 
    this.reqval.confirmationSummaryApprovedFromCSTId=Number(this.service.pcform.value.confirmationSummaryApprovedFromCSTId);
    this.reqval.requestType='pc connect'; 
    this.reqval.customerConnectionRequestType='PC connect';
    if(this.service.pcform.value.id==0||this.service.pcform.value.id==null||this.service.pcform.value.id==undefined){
  this.reqval.id=0; 
  this.service.pcform.value.id=0;
    this.reqser.addReqest(this.reqval).subscribe((res)=>{
      this.appear=false;
      (this.img1 as ElementRef).nativeElement.style.display="none";
      // setTimeout(() => {
      //   (this.img1 as ElementRef).nativeElement.style.display="none";
       
      // },10000);

    if(res.status==true)    {
    this.notser.success("Added!") ;
   // this.navigateTourl(res.data?.id);
    this._router.navigate(['/pcconnectrequest'])

    }
    else{
    this.notser.warn(res.error) ;

    }
    },err=>{
      this.appear=false;
      
      (this.img1 as ElementRef).nativeElement.style.display="none";
      if(err.status==401)
      this._router.navigate(['/login'], { relativeTo: this._route });
      else 
      this.notser.warn("! Fail");
     
    }); 
  }
  else{
    if(this.iseditpage==false){
      this.reqval.isnew=true;
    }
   this.reqval.id=this.reqid;
    this.reqser.editReqest(this.reqval).subscribe((res)=>{
      
      this.appear=false;    
      
        (this.img1 as ElementRef).nativeElement.style.display="none";

      if(res.status==true)    {
        (this.img1 as ElementRef).nativeElement.style.display="none";
        this.appear=false;
     //   (this.img as ElementRef).nativeElement.style.display="none";
        this.notser.success("saved!") ;
    this._router.navigate(['/pcconnectrequest'])
       
        }
        else{
          this.notser.warn(res.error) ;
    
        }

    },err=>{
      this.appear=false;
      (this.img1 as ElementRef).nativeElement.style.display="none";
      // setTimeout(() => {
      //   (this.img1 as ElementRef).nativeElement.style.display="none";
       
      // },10000);

      if(err.status==401)
      this._router.navigate(['/login'], { relativeTo: this._route });
      else 
      this.notser.warn("! Fail");
     
    });
  }
}
   
  oldflag=true;
  ngOnInit(){
 this.service.pcform.reset();
  this.onClearValid();
    this.pickser.getReqests().subscribe((res)=>{
      
      if(res.status==false)
      this.notser.warn('Fail to get some lists');
      else
      res.result?.data.forEach(x=>{
      if(x.attributeName?.toLocaleLowerCase()=='forecast'){
            this.forcastList.push(x);
      }
      if(x.attributeName?.toLocaleLowerCase()=='customer testing tool'.toLocaleLowerCase()){
        this.custestList.push(x);
  }
     if(x.attributeName?.toLocaleLowerCase()=='billing approval confirmation'){
      this.confirmList.push(x);          
      }     
      if(x.attributeName?.toLocaleLowerCase()=='vrf'){
      this.vrfList.push(x);
               
      }
      // if(x.attributeName?.toLocaleLowerCase()=='status'){
      //   this.statusList.push(x);
                 
      //   }
     if(x.attributeName?.toLocaleLowerCase()=='ipallocation'){
      this.ipAllocatedList.push(x);

      } 
      if(x.attributeName?.toLocaleLowerCase()=='case periority'){
        this.periorList.push(x);
  
        }
        if(x.attributeName?.toLocaleLowerCase()=='Customer Directions'.toLocaleLowerCase()){
          this.cusneedList.push(x);
    
          } 
          if(x.attributeName?.toLocaleLowerCase()=='Customer Port Or AllowAny'.toLocaleLowerCase()){
            this.cusportList.push(x);
       
            }  
      //case periority
         })  
     // this.sortlist(this.statusList);
      this.sortlist(this.forcastList);
      this.sortlist(this.custestList);
      this.sortlist(this.confirmList);
      this.sortlist(this.vrfList);
      this.sortlist(this.ipAllocatedList); this.sortlist(this.periorList);
      this.sortlist(this.cusneedList);
      this.sortlist(this.cusportList);

    },err=>{
      if(err.status==401)
      this._router.navigate(['/login'], { relativeTo: this._route });
      else 
      this.notser.warn("! Fail to get some lists");
     
    });
    this.pickser.getpclists().subscribe(res=>{
      if(res.status==true){    
this.confirmSummaryList=res.data.confirmationSummaries;
this.confirmPoolList=res.data.confirmedIpPools;
this.contractList=res.data.contractTypes;
this.statusList=res.data.currentStatus;
this.newOldList=res.data.newoldList;

//this.contractList=res.data.contractTypes;
this.simtestList=res.data.testSimDataSerials;
console.log(res);
      }
      else{
      this.notser.warn('Fail to get some lists');

      }
    },err=>{
      if(err.status==401)
      this._router.navigate(['/login'], { relativeTo: this._route });
      else 
      this.notser.warn("! Fail to get some lists");
     
    });
 var teamval= localStorage.getItem("teamName");
   if(teamval?.toLocaleLowerCase()=='epm'){
     this.presalesFlag = true;
      this.saleFlag=true;  
      this.opFlag=true;
      this.espFlag=true;  
     this.service.pcform.controls['casePeriority'].setValidators([Validators.required])
    //  this.service.pcform.controls['destinationIpOfCustomer'].setValidators([Validators.required,
    //   Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/[0-3][0-9]')])
     
      this.service.pcform.controls['ipPool'].setValidators([Validators.required,
        Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/[0-3][0-9]')])
  
      this.service.pcform.controls['contracttypeId'].setValidators([Validators.required])

   }
   else if(teamval?.toLocaleLowerCase()=='presales'){
    this.epmFlag=true;  
    this.opFlag=true;
    this.espFlag=true; 
    this.service.pcform.controls['ipAllocationId'].setValidators([Validators.required])
    this.service.pcform.controls['forecastId'].setValidators([Validators.required])
    this.service.pcform.controls['customerNeedOneWayOrTwoWaysDirectionsId'].setValidators([Validators.required])

  }
  else if(teamval?.toLocaleLowerCase()=='esp'){
    this.service.pcform.controls['vrfDetails'].setValidators([Validators.required])
    this.service.pcform.controls['confirmedThatIpPoolNotDuplicatedId'].setValidators([Validators.required])
    this.service.pcform.controls['confirmationSummaryApprovedFromCSTId'].setValidators([Validators.required])
    // this.service.pcform.controls['destinationIpOfCustomer'].setValidators([ 
    //   Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)')])
 
      this.service.pcform.controls['customerNeedsSpecificPortOrAllowAnyId'].setValidators([Validators.required])
       
      // this.service.pcform.controls['destinationIpOfCustomer'].setValidators([
      //   Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/[0-3][0-9]')])
       
        this.service.pcform.controls['ipPool'].setValidators([
          Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/[0-3][0-9]')])
         
    
  }//"c"
  else if(teamval?.toLocaleLowerCase()=='operation'){
  this.service.pcform.controls['apnName'].setValidators([Validators.required])
  this.presalesFlag = true;
    this.epmFlag=true;  
    this.espFlag=true;
    this.saleFlag=true;
  }//"Operation"
  else if (teamval?.toLocaleLowerCase() == 'readonly') {
    this.epmFlag = true;
    this.presalesFlag = true;
    this.presalesFlag = true;
    this.opFlag = true;
    this.espFlag = true;
    this.saleFlag = true;
    this.readonlyFlag=true;

  }
  else {
    this.epmFlag = true;
    this.presalesFlag = true;
    this.opFlag = true;
    this.espFlag = true;
    this.saleFlag = true;
    this.readonlyFlag=true;
  }
   
  }
  applyselectpool(filterValue:any) {
    console.log(filterValue);
    if(filterValue==4)
    this.oldflag=true;    
    if(filterValue==5)
    this.oldflag=false;  
  }
  sortlist(arr :any[]){
    arr.sort(function(a, b) {
      let oa=0;
      if(a.orderInList !=null)
       oa=a.orderInList; 
      let ob=0;
      if(b.orderInList !=null)
       ob=b.orderInList;
  
      return oa - ob ; 
    }); 
  }
  onClearValid(){
    this.service.pcform.controls['contracttypeId'].clearValidators();
    this.service.pcform.controls['vrfDetails'].clearValidators();
    this.service.pcform.controls['ipAllocationId'].clearValidators();
    this.service.pcform.controls['forecastId'].clearValidators();
    this.service.pcform.controls['casePeriority'].clearValidators();
    this.service.pcform.controls['confirmedThatIpPoolNotDuplicatedId'].clearValidators();
    this.service.pcform.controls['confirmationSummaryApprovedFromCSTId'].clearValidators();
    this.service.pcform.controls['apnName'].clearValidators();
    this.service.pcform.controls['destinationIpOfCustomer'].clearValidators();
   
    this.service.pcform.controls['customerNeedsSpecificPortOrAllowAnyId'].clearValidators();
    this.service.pcform.controls['customerNeedOneWayOrTwoWaysDirectionsId'].clearValidators();
    this.service.pcform.controls['ipPool'].clearValidators();
   
  }
  onClear(){
    this.service.pcform.reset();
    
  }
  setReactValue(reqreact:RequestCls){
    this.service.pcform.patchValue({
      casePeriority: reqreact.casePeriority,
      billingApprovalConfirmationId: reqreact.billingApprovalConfirmationId,
      customerConnectionRequestType: reqreact.customerConnectionRequestType,
      customerName: reqreact.customerName,
      noOfSIMs: reqreact.noOfSIMs,
      vrfId: reqreact.vrfId,
      newoldId: reqreact.newoldId,
      statusId: reqreact.statusId,
      apnName: reqreact.apnName,
      viewComment: reqreact.generalComment,
      forecastNumber:reqreact.forecastNumber,
      confirmationSummaryApprovedFromCSTId:reqreact.confirmationSummaryApprovedFromCSTId,
      confirmedThatIpPoolNotDuplicatedId:reqreact.confirmedThatIpPoolNotDuplicatedId,
      contracttypeId:reqreact.contracttypeId,
      currentstatusId:reqreact.currentstatusId,
      usedTestSimDataSerialId:reqreact.usedTestSimDataSerialId,
      ecrmNumberSample: reqreact.ecrmNumberSample,
      forecastId: reqreact.forecastId,
       id: reqreact.id,
       ipAllocationId: reqreact.ipAllocationId,
       ipPool: reqreact.ipPool,
       oldECRMNumber: reqreact.oldECRMNumber,
       requestedQuota: reqreact.requestedQuota,
       destinationIpOfCustomer: reqreact.destinationIpOfCustomer,
       vrfDetails: reqreact.vrfDetails,
       customerTestingTool: reqreact.customerTestingTool,
       customerNeedOneWayOrTwoWaysDirectionsId: reqreact.customerNeedOneWayOrTwoWaysDirectionsId,
       customerNeedsSpecificPortOrAllowAnyId: reqreact.customerNeedsSpecificPortOrAllowAnyId,

    });
  
 }
   
  
     navigateTourl(qid:any){
        
       window.location.href = window.location.href+"?id="+qid;
 
     }
}
