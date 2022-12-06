 
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { RequestCls } from 'src/app/Model/RequestCls';
import { ResposeCls } from 'src/app/Model/ResponseCls';
import { ResposeData } from 'src/app/Model/ResponseCls';
import {ConfigurationService} from'src/app/shared/services/configuration.service';
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RequestSerService
 {
  
  private apiURL:string;
  private headers = new HttpHeaders();
   constructor(private httpClient: HttpClient,
    private config:ConfigurationService)
     {
     this.apiURL= this.config.ApiUrl() + "request";
     this.headers =this.headers.set('Authorization',"Bearer "+ this.config.UserToken()); 
     }
 public getReqests()
 {
    return this.httpClient.get<ResposeCls>(this.apiURL,{headers: this.headers});
 }
public getReqestOption(requestTypeval:string,pageSize:number,pageNum:number ,search:string="",sortColumn:string="id",sortDir:string='ASC')
{
   
  this.headers =this.headers.set('Authorization',"Bearer "+ this.config.UserToken()); 
    var urlval=`${this.apiURL}?pagesize=${pageSize}&pagenumber=${pageNum}&sortcolumn=${sortColumn}&sortcolumndir=${sortDir}&searchvalue=${search}&requestType=${requestTypeval}`;
    return this.httpClient.get<ResposeCls>(urlval,{headers: this.headers});
}

  public getReqest(id:number)
  {
    return this.httpClient.get<ResposeData>(`${this.apiURL}/${id}`,{headers: this.headers});
  }
  public addReqest(Val:RequestCls)
  {
    return this.httpClient.post<ResposeData>(`${this.apiURL}`,Val,{headers: this.headers});
  }
  public editReqest(Val:RequestCls)
  {
    //return this.httpClient.put<ResposeData>(this.apiURL,Val,{headers: this.headers});
    return this.httpClient.post<ResposeData>(this.apiURL+"/UpdateRequest",Val,{headers: this.headers});

    
  }
  public delReqest(Val:number)
  { 
   // return this.httpClient.delete<ResposeData>(this.apiURL + "/" + Val,{headers: this.headers});
    return this.httpClient.get<ResposeData>(this.apiURL + "/RemoveRequest/" + Val,{headers: this.headers});

    
  }
}

