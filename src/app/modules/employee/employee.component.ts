import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
//import { from } from 'rxjs';
import { RequestCls } from 'src/app/Model/RequestCls';
import { PickList } from 'src/app/Model/PickList';

import { EmpService } from 'src/app/shared/services/emp.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PickListSerService } from 'src/app/shared/services/pick-list-ser.service'
import { NotificationService } from 'src/app/shared/services/notification.service';

import { RequestSerService } from 'src/app/shared/services/request-ser.service'
import { ConfigurationService } from 'src/app/shared/services/configuration.service';
import { Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  public reqData: RequestCls = new RequestCls();
  param1: any;
  appear = false;

  @ViewChild('loading1') img1?: ElementRef;
  public reqval: RequestCls = new RequestCls();
  public forcastList: PickList[] = [];
  public ipAllocatedList: PickList[] = [];
  public periorList: PickList[] = [];
  public vrfList: PickList[] = [];
  public confirmList: PickList[] = [];
    oldflag=true;  
    iseditpage=false;
  public ordertypeList :any[]=[];
 public confirmtunnelList :any[]=[];
 public statusList :any[]=[];
 public newOldList :any[]=[];
 public contractList :any[]=[];
 public simtestList :any[]=[];
  vrfobj: PickList = new PickList();
  reqid: number = 0;
  epmFlag: boolean = false;
  presalesFlag: boolean = false;
  espFlag: boolean = false;
  opFlag: boolean = false;
  saleFlag: boolean = false;
  readonlyFlag: boolean = false;
  commentFlag: boolean = true;
  constructor(private reqser: RequestSerService, public service: EmpService,
    private _route: ActivatedRoute,
    private _router: Router, private pickser: PickListSerService, private notser: NotificationService,
    private config: ConfigurationService, private titleService: Title
  ) {
    this.config.IsAuthentecated();
    this.titleService.setTitle('4G | Dm-VPN-Request-Details');
    this._route.queryParams.subscribe((params: any) => {

      this.param1 = params['id'];
      if (this.param1 != undefined) {
        this.service.form.get("id")?.setValue(this.param1);
        this.reqser.getReqest(this.param1).subscribe((res) => {
          
          if (res.status == true) {
            this.iseditpage=true;
            this.reqval = res.data;
            this.commentFlag=false;
            console.log(this.reqval)
            if(this.reqval.tunnelWANIpAddressFromCustomer==null||this.reqval.tunnelWANIpAddressFromCustomer==""){
              this.iseditpage=false;
            }
            console.log(this.reqval);
            this.reqid = res.data?.id || 0;
            this.reqval?.customerName
            if(this.reqval.vrfId==4){
              this.oldflag=true;
            }
            if(this.reqval.vrfId==5){
              this.oldflag=false;
            }
            this.setReactValue(res.data);
            if(this.reqval.orderTypeId==1){
              this.mainflag=false;
              this.backflag=true;
            }
            if(this.reqval.orderTypeId==2){
              this.mainflag=false;
      this.backflag=false;
            }

            //     this.service.form.get('vrfId').setValue('valueFromServer'),
          }
          else this.notser.warn(res.error);
        }, err => {
          if (err.status == 401)
            this._router.navigate(['/login'], { relativeTo: this._route });
          else
            this.notser.warn("! Fail");
 
        });
      }
      else {
        this.param1 = 0;
        var tok = this.config.UserToken();
        if (tok == undefined) {
          this._router.navigate(['/login']);

        }
      }

    });
  }
  onselectcheckall(dat:any){

  }
  applyselectpool(filterValue:any) {
    console.log(filterValue);
    if(filterValue==4)
    this.oldflag=true;    
    if(filterValue==5)
    this.oldflag=false;  
  }

  onSubmit() {
    debugger;
    //  this.submitted = true; 
    this.appear = true;
    
    (this.img1 as ElementRef).nativeElement.style.display = "block";
    // stop here if form is invalid
    if (this.service.form.invalid) {
      this.appear=false;
    
      // setTimeout(() => {
          (this.img1 as ElementRef).nativeElement.style.display="none";
         
        // },10000);

      return;
    }
debugger
    this.reqval = this.service.form.value;
    if (this.service.form.value.vrfId != null)
      this.reqval.vrfId = Number(this.service.form.value.vrfId);
    if (this.service.form.value.billingApprovalConfirmationId != null)
      this.reqval.billingApprovalConfirmationId = Number(this.service.form.value.billingApprovalConfirmationId);
    if (this.service.form.value.ipAllocationId != null)
      this.reqval.ipAllocationId = Number(this.service.form.value.ipAllocationId);
    if (this.service.form.value.forecastId != null)
      this.reqval.forecastId = Number(this.service.form.value.forecastId);
      ///////
//////
if(this.service.form.value.usedTestSimDataSerialId!=null) 
this.reqval.usedTestSimDataSerialId=Number(this.service.form.value.usedTestSimDataSerialId);
if(this.service.form.value.contracttypeId!=null) 
this.reqval.contracttypeId=Number(this.service.form.value.contracttypeId);
if(this.service.form.value.confirmedTunnelIpNotDuplicatedId!=null) 
this.reqval.confirmedTunnelIpNotDuplicatedId=Number(this.service.form.value.confirmedTunnelIpNotDuplicatedId); 
if(this.service.form.value.currentstatusId!=null) 
  this.reqval.currentstatusId=Number(this.service.form.value.currentstatusId);
  if(this.service.form.value.orderTypeId!=null) 
  this.reqval.orderTypeId=Number(this.service.form.value.orderTypeId);
  if(this.service.form.value.forecastNumber!=null) 
  this.reqval.forecastNumber=Number(this.service.form.value.forecastNumber);
  debugger;
  this.reqval.customerConnectionRequestType='DMVPN';


    this.reqval.requestType = 'DMVPN';

    if (this.service.form.value.id == 0 || this.service.form.value.id == null || this.service.form.value.id == undefined) {
      this.service.form.value.id = 0;
      this.reqval.id = 0;
      this.reqser.addReqest(this.reqval).subscribe((res) => {
          this.appear=false;
  
        (this.img1 as ElementRef).nativeElement.style.display="none";
   
        if (res.status == true) {
         
        //  (this.img as ElementRef).nativeElement.style.display="none";
          this.notser.success("Added!");
          // this.navigateTourl(res.data?.id); dmvpnrequest
          this._router.navigate(['/dmvpnrequest'], { relativeTo: this._route });

        }
        else {
          this.notser.warn(res.error) ;

        }
      }, err => {
        this.appear=false;
        
          (this.img1 as ElementRef).nativeElement.style.display="none";
     

        if (err.status == 401)
          this._router.navigate(['/login'], { relativeTo: this._route });
        else
          this.notser.warn("! Fail");

      });
    }
    else {

      this.reqval.id = this.reqid;
      if(this.iseditpage==false){
        this.reqval.isnew=true;
      }
      this.reqser.editReqest(this.reqval).subscribe((res) => {
       
        this.appear=false;
        
          (this.img1 as ElementRef).nativeElement.style.display="none";
     

        if (res.status == true) {
       //   (this.img as ElementRef).nativeElement.style.display="none";
          this.notser.success("saved!");
          this._router.navigate(['/dmvpnrequest'], { relativeTo: this._route });

        }
        else {
          this.notser.warn(res.error) ;

                    console.log(res)        }

      }, err => {
        this.appear=false;
        
          (this.img1 as ElementRef).nativeElement.style.display="none";
         

        if (err.status == 401)
          this._router.navigate(['/login'], { relativeTo: this._route });
        else
          this.notser.warn("! Fail");

      });
    }
  }

  ngOnInit() {
    this.service.form.reset();
    this.onClearValid();
    this.pickser.getReqests().subscribe((res) => {
  
      if (res.status == false)
        this.notser.warn(res.error);
      else
        res.result?.data.forEach(x => {
          if (x.attributeName?.toLocaleLowerCase() == 'forecast') {
            this.forcastList.push(x);
          }
          if (x.attributeName?.toLocaleLowerCase() == 'billing approval confirmation') {
            this.confirmList.push(x);
          }
          if (x.attributeName?.toLocaleLowerCase() == 'vrf') {
            this.vrfList.push(x);

          }
          // debugger;
          // if (x.attributeName?.toLocaleLowerCase() == 'status') {
          //   this.statusList.push(x);

          // }
          if (x.attributeName?.toLocaleLowerCase() == 'ipallocation') {
            this.ipAllocatedList.push(x);

          }
          if (x.attributeName?.toLocaleLowerCase() == 'case periority') {
            this.periorList.push(x);

          }
          //case periority
        })
        this.sortlist(this.statusList);
        this.sortlist(this.forcastList);
        
        this.sortlist(this.confirmList);
        this.sortlist(this.vrfList);
        this.sortlist(this.ipAllocatedList); this.sortlist(this.periorList);
        

    }, err => {
      if (err.status == 401)
        this._router.navigate(['/login'], { relativeTo: this._route });
      else
        this.notser.warn("! Fail");

    });
this.pickser.getdmvpnlists().subscribe(res=>{
  if(res.status==true){    
this.ordertypeList=res.data.orderTypes;
this.confirmtunnelList=res.data.confirmedIpTunnels;
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
    var teamval = localStorage.getItem("teamName");
    if (teamval?.toLocaleLowerCase() == 'epm') {
      debugger;
      this.presalesFlag = true;
      this.saleFlag = true;
      this.opFlag = true;
      this.espFlag = true;
      this.service.form.controls['casePeriority'].setValidators([Validators.required])
      this.service.form.controls['orderTypeId'].setValidators([Validators.required])
      this.service.form.controls['contracttypeId'].setValidators([Validators.required])
      this.service.form.controls['tunnelWANIpAddressFromCustomer'].setValidators([Validators.required,
      Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/[0-3][0-9]')])
//((\b|\.)(0|1|2(?!5(?=6|7|8|9)|6|7|8|9))?\d{1,2}){4}(-((\b|\.)(0|1|2(?!5(?=6|7|8|9)|6|7|8|9))?\d{1,2}){4}|\/((0|1|2|3(?=1|2))\d|\d))\b
    }
    else if (teamval?.toLocaleLowerCase() == 'presales') {
      debugger;
      this.opFlag = true;
      this.epmFlag=true;  
      this.espFlag = true;
      this.service.form.controls['ipAllocationId'].setValidators([Validators.required])
      this.service.form.controls['forecastId'].setValidators([Validators.required])

    }
    else if (teamval?.toLocaleLowerCase() == 'esp') {
      debugger;
      this.service.form.controls['vrfDetails'].setValidators([Validators.required])
      this.service.form.controls['confirmedTunnelIpNotDuplicatedId'].setValidators([Validators.required])
      this.service.form.controls['tunnelWANIpAddressFromCustomer'].setValidators([
        Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/[0-3][0-9]')])
        this.service.form.controls['loopbackIPAddress'].setValidators([
          Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/[0-3][0-9]')])
         
    }//"c"
    else if (teamval?.toLocaleLowerCase() == 'operation') {
      debugger;
      this.service.form.controls['apnName'].setValidators([Validators.required])
      this.epmFlag = true;
      this.presalesFlag = true;
      this.espFlag = true;
      this.saleFlag = true;
    }//"Operation"
    else if (teamval?.toLocaleLowerCase() == 'readonly') {
      debugger;
      this.epmFlag = true;
      this.presalesFlag = true;
      this.opFlag = true;
      this.espFlag = true;
      this.saleFlag = true;
      this.readonlyFlag=true;
 
    }
    else {
      debugger;
      this.epmFlag = true;
      this.presalesFlag = true;
      this.opFlag = true;
      this.espFlag = true;
      this.saleFlag = true;
      this.readonlyFlag=true;
    }

  }
backflag=true;
mainflag=true;
  onChange(deviceValue:any) { 
    if(deviceValue.value==1){
      this.mainflag=false;
      this.backflag=true;
    }
    if(deviceValue.value==2){
     this.mainflag=false;
     this.backflag=false;   
    }
    console.log(deviceValue);
}
  onClearValid() {
    this.service.form.controls['apnName'].clearValidators();
    this.service.form.controls['vrfDetails'].clearValidators();
    this.service.form.controls['ipAllocationId'].clearValidators();
    this.service.form.controls['forecastId'].clearValidators();
    this.service.form.controls['casePeriority'].clearValidators();
    this.service.form.controls['tunnelWANIpAddressFromCustomer'].clearValidators();
    this.service.form.controls['confirmedTunnelIpNotDuplicatedId'].clearValidators();
    this.service.form.controls['contracttypeId'].clearValidators();
    this.service.form.controls['orderTypeId'].clearValidators();

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
  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }
  setReactValue(reqreact: RequestCls) {
    this.service.form.patchValue({
      casePeriority: reqreact.casePeriority,
      billingApprovalConfirmationId: reqreact.billingApprovalConfirmationId,
      customerConnectionRequestType: reqreact.customerConnectionRequestType,
      customerName: reqreact.customerName,
      noOfSIMs: reqreact.noOfSIMs,
      newoldId: reqreact.newoldId,
      vrfId: reqreact.vrfId,
      currentstatusId: reqreact.currentstatusId,
      apnName: reqreact.apnName,
      orderTypeId: reqreact.orderTypeId,
      mainOrder: reqreact.mainOrder,
      backupMainOrder: reqreact.backupMainOrder,
      backupOrder: reqreact.backupOrder,
      confirmedTunnelIpNotDuplicatedId: reqreact.confirmedTunnelIpNotDuplicatedId,
      contracttypeId: reqreact.contracttypeId,
      viewComment: reqreact.generalComment,
      usedTestSimDataSerialId: reqreact.usedTestSimDataSerialId,
      ecrmNumberSample: reqreact.ecrmNumberSample,
      forecastId: reqreact.forecastId,
      id: reqreact.id,
      ipAllocationId: reqreact.ipAllocationId,
      loopbackIPAddress: reqreact.loopbackIPAddress,
      oldECRMNumber: reqreact.oldECRMNumber,
      requestedQuota: reqreact.requestedQuota,
      tunnelWANIpAddressFromCustomer: reqreact.tunnelWANIpAddressFromCustomer,
      vrfDetails: reqreact.vrfDetails,
      forecastNumber: reqreact.forecastNumber,

    });

  }


  navigateTourl(qid: any) {

    window.location.href = window.location.href + "?id=" + qid;

  }
}
