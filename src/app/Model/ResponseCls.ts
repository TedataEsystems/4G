import { RequestCls } from '../Model/RequestCls';
  
export class ResposeCls {
    status:boolean=false;
    result:any;
    error:any
}
export class ResposeData {
    status:boolean=false;
    data:RequestCls=new RequestCls();
    error:any
}
