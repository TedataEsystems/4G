 import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
//import { from } from 'rxjs';
import { simdataModel } from 'src/app/Model/simdatacls';
import { PickList } from 'src/app/Model/PickList';
import { RequestCls } from 'src/app/Model/RequestCls';
import { EmpService } from 'src/app/shared/services/emp.service';
import { Router, ActivatedRoute } from '@angular/router';
import{PickListSerService} from'src/app/shared/services/pick-list-ser.service'
import { NotificationService} from 'src/app/shared/services/notification.service';
import { SimdataService} from 'src/app/shared/services/simdata.service';

import{RequestSerService} from'src/app/shared/services/request-ser.service'
import { ConfigurationService } from 'src/app/shared/services/configuration.service';
import { Title } from '@angular/platform-browser';
import { defaultRippleAnimationConfig } from '@angular/material/core';

@Component({
  selector: 'app-simdetail',
  templateUrl: './simdetail.component.html',
  styleUrls: ['./simdetail.component.css']
})
export class SimdetailComponent implements OnInit {
  appear= false;
 
 @ViewChild('loading1') img1?: ElementRef;
 
 public reqData:simdataModel=new simdataModel(); 
 param1:any;
 requestid:any;
 requestdata:RequestCls=new RequestCls();
 public reqval:simdataModel=new simdataModel();
 public probList :PickList[]=[];
 public apnList :PickList[]=[];
  public epmList :PickList[]=[];
  public npaList :PickList[]=[];
  public foreList :PickList[]=[];
  public npatypeList :PickList[]=[];
  public simStatuslist :PickList[]=[];
  public consultantList :PickList[]=[];
  public coreList :PickList[]=[];
  vrfobj :PickList=new PickList() ;
  reqid:number=0;
  poolID?:number=0;
  epmFlag:boolean=false;
  espFlag:boolean=false;
  opFlag:boolean=false;
  commentFlag=true;
  saleFlag:boolean=false;pcflag=false;dmflag=false;
  constructor(private reqser:RequestSerService,public service :EmpService,
    private _route: ActivatedRoute, private simser:SimdataService, private config:ConfigurationService,
    private _router: Router,private pickser:PickListSerService, private notser:NotificationService,private titleService: Title
    )
        
   { 
     this.config.IsAuthentecated();
     this.titleService.setTitle('4G | Sim Details');
    this._route.queryParams.subscribe((params:any) => {
      var req=   sessionStorage.getItem('simkey');//dmv
     if(req=='dmv')
     this.dmflag=true;
     if(req=='pc')
     this.pcflag=true;
      this.param1 = params['id'];    
      this.requestid = params['reqid'];    //poolid
      this.poolID = params['poolid'];    //poolid

      if(this.param1!=undefined){
        this.service.simform.get("id")?.setValue(this.param1);
        this.simser.getSimData(this.param1).subscribe((res)=>{
           if(res.status==true){
            debugger
             this.commentFlag=false;
            this.reqval=res.data ;
            this.reqid=res.data?.id||0;
            this.reqval?.customerName;
            this.requestid=res.data.requestId;
            this.poolID=this.reqval.poold;
            this.getrequestbyId(this.requestid,false);


            console.log(res);
            this.setReactValue(res.data);

       //     this.service.form.get('vrfId').setValue('valueFromServer'),
          }else
          this.notser.warn(res.error)
        },err=>{
          if(err.status==401)
          this._router.navigate(['/login'], { relativeTo: this._route });
          else 
          this.notser.warn("! Fail");
         
        }
        );
      }
      else 
      {debugger
       this.getrequestbyId(this.requestid,true);
        this.param1=0;  var tok= this.config.UserToken();
        if(tok==undefined){
        this._router.navigate(['/login'] );
      }
    }

  });
   }

   getrequestbyId(id:any,addflag:boolean){
this.reqser.getReqest(id).subscribe(res=>{
  //debugger;
if(res.status==true){
this.requestdata=res.data;
var requestvaluedata= new simdataModel()


if(this.requestdata.requestType=='pc connect'){
this.pcflag=true;//des
requestvaluedata.simPoolSubnetTunnelSubnet=this.requestdata.ipPool;
requestvaluedata.destinationIpsLoopbackIP=this.requestdata.destinationIpOfCustomer;

}
else if(this.requestdata.requestType=='DMVPN'){
  this.dmflag=true;
  requestvaluedata.simPoolSubnetTunnelSubnet=this.requestdata.tunnelWANIpAddressFromCustomer;
requestvaluedata.destinationIpsLoopbackIP=this.requestdata.loopbackIPAddress;
}
if(addflag){
  debugger;
  requestvaluedata.customerName=this.requestdata.customerName;
  requestvaluedata.apnName=this.requestdata.apnName;
  requestvaluedata.forecastId=this.requestdata.forecastId;
  this.setReactValue(requestvaluedata);

}
    }
    else{
      this.notser.warn(res.error)
this.getsimdatalink();
    }

     },err=>{
      if(err.status==401)
      this._router.navigate(['/login'], { relativeTo: this._route });
      else 
      this.notser.warn("! Fail");
this.getsimdatalink();
     
    })
   }
   getsimdatalink(){
    this._router.navigate(['/simdata'], { queryParams: { reqid: this.requestid } } );

   }
onSubmit()
   {
    this.appear=true;
  
    (this.img1 as ElementRef).nativeElement.style.display="block";
    //(document.querySelector('#loading') as HTMLElement).style.display="inline-block";
 
  //  this.submitted = true; 
    // stop here if form is invalid
    if(this.pcflag==true)
    {
     var x= this.service.simform.get('simPoolSubnetTunnelSubnet')?.value.Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/[0-3][0-9]');
      console.log(x);

    }
    if (this.service.simform.invalid) {
      this.appear=false;
    
      (this.img1 as ElementRef).nativeElement.style.display="none";

        return;
    }
   
    
    this.reqval=this.service.simform.value;
    // if(this.service.simform.value.apnId!=null) 
    // this.reqval.apnId=Number(this.service.simform.value.apnId); 
     if(this.service.simform.value.problemId!=null) 
    this.reqval.problemId=Number(this.service.simform.value.problemId);
    if(this.service.simform.value.consultancyCommentId!=null) 
    this.reqval.consultancyCommentId=Number(this.service.simform.value.consultancyCommentId);
    if(this.service.simform.value.epmCommentId!=null) 
    this.reqval.epmCommentId=Number(this.service.simform.value.epmCommentId);
    if(this.service.simform.value.coreCommentId!=null) 
    this.reqval.coreCommentId=Number(this.service.simform.value.coreCommentId);
    if(this.service.simform.value.id==0||this.service.simform.value.id==null||this.service.simform.value.id==undefined){
      this.service.simform.value.requestId=Number(this.requestid);//poold
      this.service.simform.value.poold=Number(this.poolID);//poold
      this.service.simform.value.id=0;
    this.simser.addSimData(this.service.simform.value).subscribe((res)=>{
     
      //this.appear=false;
      // this.dis=true;
      this.appear=false;  
      (this.img1 as ElementRef).nativeElement.style.display="none";
      
    if(res.status==true)    {
  //    this.appear=false;
 //     (this.img as ElementRef).nativeElement.style.display="none";
    this.notser.success("Added!") ;
    
    this._router.navigate(['/simdata'], { queryParams: { reqid: this.requestid,poolsid:this.poolID  } } );
    
   // this.navigateTourl(res.data?.id);

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
      
   this.reqval.id=this.reqid;
   this.reqval.requestId=Number(this.requestid);
   //this.reqval.poold=Number(this.poolID);
    this.simser.editSimData(this.reqval).subscribe((res)=>{

      (this.img1 as ElementRef).nativeElement.style.display="none";

      this.appear=false;
      
      if(res.status==true)    {
        //(document.querySelector('#loading') as HTMLElement).style.display="none";
        
        this.notser.success("saved!") ;
    this._router.navigate(['/simdata'], { queryParams: { reqid: this.requestid,poolsid:this.poolID } } );
       
        }
        else{
        this.notser.warn(res.error) ;
    
        }

    },err=>{
      (this.img1 as ElementRef).nativeElement.style.display="none";

      this.appear=false;


      if(err.status==401)
      this._router.navigate(['/login'], { relativeTo: this._route });
      else 
      this.notser.warn("! Fail");
     
    });
  }
}
simflag=true;
  ngOnInit(){
    var teamval= localStorage.getItem("teamName");
    if(teamval?.toLocaleLowerCase()=='epm'){
       this.simflag=false;  
        
    }
    else if(teamval?.toLocaleLowerCase()=='presales'){
     this.simflag=true;  
      
  }
  else if(teamval?.toLocaleLowerCase()=='esp'){
   this.simflag=false;  
    
 }
 else{
   this.simflag=true;  
 
 } 
 if(this.simflag){
   this.notser.warn("not permission");
  this._router.navigate(['/'] );      

 }
      
    this.service.simform.reset();
    this.pickser.getReqests().subscribe((res)=>{
      
      if(res.status==false) this.notser.warn(res.error);
      else
      res.result?.data.forEach(x=>{
      if(x.attributeName?.toLocaleLowerCase()=='problem'){
            this.probList.push(x);
      }
     if(x.attributeName?.toLocaleLowerCase()=='core comment'){
      this.coreList.push(x);          
      }     
      if(x.attributeName?.toLocaleLowerCase()=='epm comment'){
      this.epmList.push(x);
               
      }
     if(x.attributeName?.toLocaleLowerCase()=='consultancy comment'){
      this.consultantList.push(x);

      } 
      if(x.attributeName?.toLocaleLowerCase()=='vrf'){
        this.npaList.push(x);
  
        } 
        if(x.attributeName?.toLocaleLowerCase()=='forecast'){
          this.foreList.push(x);
    
          }
        //
        if(x.attributeName?.toLocaleLowerCase()=='apn type'){
          this.npatypeList.push(x);
    
          } 
          if(x.attributeName?.toLocaleLowerCase()=='sim status'){
            this.simStatuslist.push(x);
            
            } 
         }) 
              

    },err=>{
      if(err.status==401)
      this._router.navigate(['/login'], { relativeTo: this._route });
      else 
      this.notser.warn("! Fail");
     
    });
 var teamval= localStorage.getItem("teamName");
   if(teamval?.toLocaleLowerCase()=='epm'){
      this.saleFlag=true;  
      this.opFlag=true;
      this.espFlag=true;  

   }
   else if(teamval?.toLocaleLowerCase()=='presales'){
    this.epmFlag=true;  
    this.opFlag=true;
    this.espFlag=true;  
  }
  else if(teamval==''){

  }
  else if(teamval==''){

  }
   
  const toSelect = this.simStatuslist.find(c =>c.id == 100);
  
  }
  onClear(){
    this.service.simform.reset();
    this.service.initializeFormGroup();
  }
  setReactValue(reqreact:simdataModel){
    this.service.simform.patchValue({
      apnId: reqreact.apnId,
      apnName: reqreact.apnName,
      new_OldId:reqreact.new_OldId,viewComment:reqreact.comment,
      apnType: reqreact.apnType,
      simStatus: reqreact.simStatus,
      customerName: reqreact.customerName,
      consultancyCommentId: reqreact.consultancyCommentId,
      coreCommentId: reqreact.coreCommentId,
      destinationIpsLoopbackIP: reqreact.destinationIpsLoopbackIP,
      dialNumber: reqreact.dialNumber,
       id: reqreact.id,
       epmCommentId: reqreact.epmCommentId,
       imsiNumber: reqreact.imsiNumber,
       orderID: reqreact.orderID,
       problemId: reqreact.problemId,
       requestId: reqreact.requestId,
       simPoolSubnetTunnelSubnet: reqreact.simPoolSubnetTunnelSubnet,
       simSerial: reqreact.simSerial,
       simipTunnelIp: reqreact.simipTunnelIp,
       vrfName: reqreact.vrfName,
      
    });
  
 }
  navigateTourl(qid:any){
        
       window.location.href = window.location.href+"&id="+qid;
 
  }
}

