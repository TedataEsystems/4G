
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { apnConclusion } from 'src/app/Model/APNConclusion';

import {ConfigurationService} from'src/app/shared/services/configuration.service';
import { from ,Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APNConclusionService
 {
  
  private apiURL:string;
  private headers = new HttpHeaders();
   constructor(private httpClient: HttpClient,
    private config:ConfigurationService)
     {
     this.apiURL= this.config.ApiUrl() + "APNConclusion";
     this.headers =this.headers.set('Authorization',"Bearer "+ this.config.UserToken()); 
     }
 public getApnConClusions()
 {
    return this.httpClient.get<any>(this.apiURL,{headers: this.headers});
 }
 public getAllSimDataEXel(search :any):Observable < Blob >
 {
   return this.httpClient.get(`${this.apiURL}/ExpotExcel?search=${search}`,
   {responseType: 'blob',headers: this.headers}); 
 }
public getApnConClusionOption(pageSize:number,pageNum:number ,search:string="",sortColumn:string="id",sortDir:string='ASC')
{
   
  this.headers =this.headers.set('Authorization',"Bearer "+ this.config.UserToken()); 

    var urlval=`${this.apiURL}?pagesize=${pageSize}&pagenumber=${pageNum}&sortcolumn=${sortColumn}&sortcolumndir=${sortDir}&searchvalue=${search}`;
    return this.httpClient.get<any>(urlval,{headers: this.headers});
}

  public getApnConClusion(id:number)
  {
    return this.httpClient.get<any>(`${this.apiURL}/${id}`,{headers: this.headers});
  }
  public addApnConClusion(Val:apnConclusion)
  {
    return this.httpClient.post<any>(`${this.apiURL}`,Val,{headers: this.headers});
  }
  public editApnConClusion(Val:apnConclusion)
  {
    //return this.httpClient.put<ResposeData>(this.apiURL,Val,{headers: this.headers});
    return this.httpClient.post<any>(this.apiURL+"/UpdateRequest",Val,{headers: this.headers});

    
  }
  public delApnConClusion(Val:number)
  { 
   // return this.httpClient.delete<ResposeData>(this.apiURL + "/" + Val,{headers: this.headers});
    return this.httpClient.get<any>(this.apiURL + "/RemoveRequest/" + Val,{headers: this.headers});

    
  }
}

