 
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { PickList } from 'src/app/Model/PickList';
import { PickResCls } from 'src/app/Model/PickResponse';
import { PickResData } from 'src/app/Model/PickResponse';
import { ConfigurationService } from 'src/app/shared/services/configuration.service';


@Injectable({
  providedIn: 'root'
})
export class CurrentStatusService {
 //private apiURL:string="http://172.29.29.8:2021/api/picklist";
 private apiURL:string;
  private headers = new HttpHeaders();
   constructor(private httpClient: HttpClient,
    private config:ConfigurationService) {
     this.apiURL= this.config.ApiUrl() + "CurrentStatus";
     this.headers =this.headers.set('Authorization',"Bearer "+ this.config.UserToken()); 
     }
  public getCurrentStatus(){
    
    this.headers =this.headers.set('Authorization',"Bearer "+ this.config.UserToken()); 
    return this.httpClient.get<PickResCls>(`${this.apiURL}`,{headers: this.headers});
  }
  public getCurrentStatusOption(pageSize:number,pageNum:number ,search:string="",sortColumn:string="id",sortDir:string='ASC')
{
  this.headers =this.headers.set('Authorization',"Bearer "+ this.config.UserToken()); 

    var urlval=`${this.apiURL}?pagesize=${pageSize}&pagenumber=${pageNum}&sortcolumn=${sortColumn}&sortcolumndir=${sortDir}&searchvalue=${search}`;
    return this.httpClient.get<PickResCls>(urlval,{headers: this.headers});
}

  public getCurrentStatusById(id:any){
    return this.httpClient.get<PickResData>(`${this.apiURL}/id`,{headers: this.headers});
  }
  public addCurrentStatus(Val:PickList){
    return this.httpClient.post<PickResData>(`${this.apiURL}`,Val,{headers: this.headers});
  }
  public editCurrentStatus(Val:PickList){
    
    return this.httpClient.post<PickResData>(`${this.apiURL}/UpdateCurrentStatus`,Val,{headers: this.headers});
  } 
  public delCurrentStatus(Val:number)
  { 
   // return this.httpClient.delete<simResposeData>(this.apiURL + "/" + Val,{headers: this.headers});
    return this.httpClient.get<PickResData>(this.apiURL + "/RemoveCurrentStatus/" + Val,{headers: this.headers});
    
  }
}