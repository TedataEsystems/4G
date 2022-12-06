import { simdataModel } from '../Model/simdatacls';
  
export class simRespose {
    status:boolean=false;
    result:any;
    error:any
}
export class simResposeData {
    status:boolean=false;
    data:simdataModel=new simdataModel();
    error:any
}