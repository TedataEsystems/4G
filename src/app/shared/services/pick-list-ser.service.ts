import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { PickList } from 'src/app/Model/PickList';
import { PickResCls } from 'src/app/Model/PickResponse';
import { PickResData } from 'src/app/Model/PickResponse';
import { ConfigurationService } from 'src/app/shared/services/configuration.service';


@Injectable({
  providedIn: 'root'
})
export class PickListSerService {
 //private apiURL:string="http://172.29.29.8:2021/api/picklist";
 private apiURL:string;
  private headers = new HttpHeaders();
   constructor(private httpClient: HttpClient,
    private config:ConfigurationService) {
     this.apiURL= this.config.ApiUrl() + "picklist";
     this.headers =this.headers.set('Authorization',"Bearer "+ this.config.UserToken()); 
     }
  public getReqests(){
    
    this.headers =this.headers.set('Authorization',"Bearer "+ this.config.UserToken()); 
    return this.httpClient.get<PickResCls>(`${this.apiURL}`,{headers: this.headers});
  }
  public getpclists(){
    
    this.headers =this.headers.set('Authorization',"Bearer "+ this.config.UserToken()); 
    return this.httpClient.get<any>(`${this.apiURL}/getpclists`,{headers: this.headers});
  }
  public getdmvpnlists(){
    
    this.headers =this.headers.set('Authorization',"Bearer "+ this.config.UserToken()); 
    return this.httpClient.get<any>(`${this.apiURL}/getdmvpnlists`,{headers: this.headers});
  }
  public getSimDataOption(attribute:any,pageSize:number,pageNum:number ,search:string="",sortColumn:string="id",sortDir:string='ASC')
{
  this.headers =this.headers.set('Authorization',"Bearer "+ this.config.UserToken()); 

    var urlval=`${this.apiURL}?pagesize=${pageSize}&pagenumber=${pageNum}&sortcolumn=${sortColumn}&sortcolumndir=${sortDir}&searchvalue=${search}&attributeName=${attribute}`;
    return this.httpClient.get<PickResCls>(urlval,{headers: this.headers});
}
public getSimDataOptionattr(attribute:any)
{ 
  this.headers =this.headers.set('Authorization',"Bearer "+ this.config.UserToken()); 

    var urlval=`${this.apiURL}?attributeName=${attribute}`;
    return this.httpClient.get<PickResCls>(urlval,{headers: this.headers});
}
  public getReqest(id:any){
    return this.httpClient.get<PickResData>(`${this.apiURL}/id`,{headers: this.headers});
  }
  public addReqest(Val:PickList){
    return this.httpClient.post<PickResData>(`${this.apiURL}`,Val,{headers: this.headers});
  }
  public editReqest(Val:PickList){
    
    return this.httpClient.post<PickResData>(`${this.apiURL}/UpdatePickList`,Val,{headers: this.headers});
  } 
  public delSimData(Val:number)
  { 
   // return this.httpClient.delete<simResposeData>(this.apiURL + "/" + Val,{headers: this.headers});
    return this.httpClient.get<PickResData>(this.apiURL + "/RemovePickList/" + Val,{headers: this.headers});
    
  }
}

