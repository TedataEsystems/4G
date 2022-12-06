
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
//import { from } from 'rxjs';
import { apnConclusion } from 'src/app/Model/APNConclusion';
import { PickList } from 'src/app/Model/PickList';

import { EmpService } from 'src/app/shared/services/emp.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PickListSerService } from 'src/app/shared/services/pick-list-ser.service'
import { NotificationService } from 'src/app/shared/services/notification.service';

import { APNConclusionService } from 'src/app/shared/services/apnconclusion.service';
import { ConfigurationService } from 'src/app/shared/services/configuration.service';
import { Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-apnconclusion-detail',
  templateUrl: './apnconclusion-detail.component.html',
  styleUrls: ['./apnconclusion-detail.component.css']
})
export class APNConclusionDetailComponent implements OnInit {

  public reqData: apnConclusion = new apnConclusion();
  param1: any;
  appear = false;
  @ViewChild('loading') img?: ElementRef;
  public reqval: apnConclusion = new apnConclusion();
  public forcastList: PickList[] = [];
  public ipAllocatedList: PickList[] = [];
  public periorList: PickList[] = [];
  public vrfList: PickList[] = [];
  public confirmList: PickList[] = [];
  public statusList: PickList[] = [];
  vrfobj: PickList = new PickList();
  reqid: number = 0;
  epmFlag: boolean = false;
  espFlag: boolean = false;
  opFlag: boolean = false;
  saleFlag: boolean = false;
  constructor(private reqser: APNConclusionService, public service: EmpService,
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
        this.reqser.getApnConClusion(this.param1).subscribe((res) => {
          
          if (res.status == true) {
            this.reqval = res.data;
            this.reqid = res.data?.id || 0;
           
            this.setReactValue(res.data);

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
//   onSubmit() {
//     //  this.submitted = true; 
//     this.appear = true;
//     (this.img as ElementRef).nativeElement.style.display = "inline-block";
//     // stop here if form is invalid
//     if (this.service.form.invalid) {
//       this.appear=false;
//       (this.img as ElementRef).nativeElement.style.display="none";

//       return;
//     }
//   /*  this.reqval = this.service.form.value;
//     if (this.service.form.value.vrfId != null)
//       this.reqval.vrfId = Number(this.service.form.value.vrfId);
//     if (this.service.form.value.billingApprovalConfirmationId != null)
//       this.reqval.billingApprovalConfirmationId = Number(this.service.form.value.billingApprovalConfirmationId);
//     if (this.service.form.value.ipAllocationId != null)
//       this.reqval.ipAllocationId = Number(this.service.form.value.ipAllocationId);
//     if (this.service.form.value.forecastId != null)
//       this.reqval.forecastId = Number(this.service.form.value.forecastId);
//     this.reqval.requestType = 'dmvpn';
// */
//       this.reqval.id = this.reqid;
//       this.reqser.editApnConClusion(this.reqval).subscribe((res) => {
       
//         this.appear=false;
//         (this.img as ElementRef).nativeElement.style.display="none";

//         if (res.status == true) {
//        //   (this.img as ElementRef).nativeElement.style.display="none";
//           this.notser.success("saved!");

//         }
//         else {
//           this.notser.warn("Not saved!");

//         }

//       }, err => {
//         this.appear=false;
//         (this.img as ElementRef).nativeElement.style.display="none";

//         if (err.status == 401)
//           this._router.navigate(['/login'], { relativeTo: this._route });
//         else
//           this.notser.warn("! Fail");

//       });
    
//   }


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
          debugger;
          if (x.attributeName?.toLocaleLowerCase() == 'status') {
            this.statusList.push(x);

          }
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

    var teamval = localStorage.getItem("teamName");
    if (teamval?.toLocaleLowerCase() == 'epm') {
      this.saleFlag = true;
      this.opFlag = true;
      this.espFlag = true;
      this.service.form.controls['casePeriority'].setValidators([Validators.required])
      this.service.form.controls['tunnelWANIpAddressFromCustomer'].setValidators([Validators.required,
      Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)')])

    }
    else if (teamval?.toLocaleLowerCase() == 'presales') {
      this.epmFlag = true;
      this.opFlag = true;
      this.espFlag = true;
      this.service.form.controls['ipAllocationId'].setValidators([Validators.required])
      this.service.form.controls['forecastId'].setValidators([Validators.required])

    }
    else if (teamval?.toLocaleLowerCase() == 'esp') {
      this.service.form.controls['vrfDetails'].setValidators([Validators.required])

      this.service.form.controls['tunnelWANIpAddressFromCustomer'].setValidators([
        Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)')])


    }//"c"
    else if (teamval?.toLocaleLowerCase() == 'operation') {
      this.service.form.controls['apnName'].setValidators([Validators.required])
      this.epmFlag = true;
      this.espFlag = true;
      this.saleFlag = true;
    }//"Operation"
    else {

    }

  }
  onClearValid() {
    this.service.form.controls['vrfDetails'].clearValidators();
    this.service.form.controls['ipAllocationId'].clearValidators();
    this.service.form.controls['forecastId'].clearValidators();
    this.service.form.controls['casePeriority'].clearValidators();
    this.service.form.controls['tunnelWANIpAddressFromCustomer'].clearValidators();

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
  setReactValue(reqreact: any) {
    

  }

}

