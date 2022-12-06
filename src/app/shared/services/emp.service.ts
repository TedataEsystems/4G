import { Injectable } from '@angular/core';
import {FormGroup,FormControl, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { PickList } from 'src/app/Model/PickList';

@Injectable({
  providedIn: 'root'
})
export class EmpService {

  constructor() { }
  pcform: FormGroup = new FormGroup({
    id: new FormControl(0),
    customerName: new FormControl(''),
    ecrmNumberSample: new FormControl(''),
   // tunnelWANIpAddressFromCustomer: new FormControl('', [ Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)')]),
    noOfSIMs: new FormControl(''),
    confirmationSummaryApprovedFromCSTId: new FormControl(null),
    requestedQuota: new FormControl(''),
    billingApprovalConfirmationId: new FormControl(null),
    newoldId: new FormControl(null),//newoldId
    oldECRMNumber: new FormControl(''),
    casePeriority: new FormControl(''),
    vrfDetails: new FormControl(''),
    apnName: new FormControl(''),
    vrfId: new FormControl(null),
   // isnew: new FormControl(''),//isnew
   isnew: new FormControl(false),//isnew
    
    ipAllocationId: new FormControl(null),
    forecastId: new FormControl(null),
    forecastNumber: new FormControl(null),
    currentstatusId: new FormControl(null),
   // loopbackIPAddress: new FormControl('',[ Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)')]) 
   customerTestingTool: new FormControl(''),
   destinationIpOfCustomer: new FormControl(null),
   ipPool: new FormControl('',[Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/[0-3][0-9]')]),
   confirmedThatIpPoolNotDuplicatedId: new FormControl(null),
   customerNeedsSpecificPortOrAllowAnyId: new FormControl(null),
   customerNeedOneWayOrTwoWaysDirectionsId: new FormControl(null),
   usedTestSimDataSerialId: new FormControl(null),
   contracttypeId: new FormControl(null),
   requestType: new FormControl(''),
   generalComment: new FormControl(''),
   viewComment: new FormControl(''),

    
  });//18
pickList?:PickList[]=[];

  form: FormGroup = new FormGroup({
    id: new FormControl(0),
    customerName: new FormControl(''),
    requestType: new FormControl(''),
    ecrmNumberSample: new FormControl(''),//isnew
    isnew: new FormControl(false),//isnew
    newoldId: new FormControl(null),//newoldId
    
   // isnew: new [false],
    tunnelWANIpAddressFromCustomer: new FormControl('',
    [Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/[0-3][0-9]')]),
    noOfSIMs: new FormControl(''),
    requestedQuota: new FormControl(''),
    billingApprovalConfirmationId: new FormControl(null),
    oldECRMNumber: new FormControl(''),
    casePeriority: new FormControl(''),
    vrfDetails: new FormControl(''),
    apnName: new FormControl(''),
    vrfId: new FormControl(null),
    customerConnectionRequestType: new FormControl(''),
    ipAllocationId: new FormControl(null),
    forecastId: new FormControl(null),
    currentstatusId: new FormControl(null),
    loopbackIPAddress: new FormControl('',[Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/[0-3][0-9]')]) ,
   ///
   orderTypeId: new FormControl(null),
   mainOrder: new FormControl(''),
   backupMainOrder: new FormControl(''),
   forecastNumber: new FormControl(''),
   generalComment: new FormControl(''),
   viewComment: new FormControl(''),
   backupOrder: new FormControl(null),
   contracttypeId: new FormControl(null),
    confirmedTunnelIpNotDuplicatedId: new FormControl(null),
    usedTestSimDataSerialId: new FormControl(null),
  });//18
  simform: FormGroup = new FormGroup({
    id: new FormControl(0),
    requestId: new FormControl(''),
    poold: new FormControl(''),
    apnType: new FormControl(''),
    
    new_OldId: new FormControl(null),
    forecastId: new FormControl(null),
    
    orderID: new FormControl(''),
    comment: new FormControl(''),
    viewComment : new FormControl(''),
    customerName: new FormControl(null),
    vrfName: new FormControl(''),
    // simPoolSubnetTunnelSubnet: new FormControl('',[Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/[0-3][0-9]')]),//
    simPoolSubnetTunnelSubnet: new FormControl(''),
    destinationIpsLoopbackIP: new FormControl(''),
    simSerial: new FormControl(null,[Validators.required]),
    dialNumber: new FormControl('',[Validators.required]),
    imsiNumber: new FormControl(null,[Validators.required]),
    apnName: new FormControl(null),
    // simipTunnelIp: new FormControl('',[Validators.required,
    //   Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/[0-3][0-9]')]) ,
    simipTunnelIp: new FormControl('') ,
    problemId: new FormControl(''),
    coreCommentId: new FormControl(null),
    epmCommentId: new FormControl(null),
    consultancyCommentId: new FormControl('') 
   
  });

  //
  apnform: FormGroup = new FormGroup({
    id: new FormControl(0),
    customerName: new FormControl(''),
    new_OldId: new FormControl(''),
    apnName: new FormControl(''),
    
    usedTestSimDataSerialId: new FormControl(''),
    receivingDate: new FormControl(null),
    sentToOperationDate: new FormControl(''),
    receivedFromOperationDate: new FormControl(''),
    workingDate: new FormControl(''),
    operationDuration: new FormControl(''),
    fullDuration: new FormControl(null),
    currentstatusId: new FormControl(''),
    apnWorkedFrom1stTestId: new FormControl(null),
    comments: new FormControl(null),
    requestId: new FormControl(null),
    serviceTypeId: new FormControl(null) 
   
  });//18
  //
  initializeFormGroup(){
    this.form.setValue({
      $key:null,
      fullName: '',
      email: '',
      mobile:'',
      city: '',
      gender: 1,
      department: 0,
      hireDate:'',
      isPermanent: false

    })
  }
 public colname:string='id';
 public coldir:string='ASC';
public pIn:number=0;
  private subject = new Subject<any>();

  sendMessage(message: any) {
      this.subject.next(message);
  }

  clearMessages() {
      this.subject.next();
  }

  onMessage(): Observable<any> {
      return this.subject.asObservable();
  }

}
