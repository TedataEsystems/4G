import { PickList } from '../Model/PickList';
  
export class PickResCls {
    status:boolean=false;
    result?:resdata;
    error:any
}
export class resdata{
data :PickList[]=[];
}
export class PickResData {
    status:boolean=false;
    data?:PickList;
    error:any
}