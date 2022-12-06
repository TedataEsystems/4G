 
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { simdataModel } from 'src/app/Model/simdatacls';
import { simRespose, simResposeData } from 'src/app/Model/simRes';
import {HttpResponse} from '@angular/common/http';

import {ConfigurationService} from'src/app/shared/services/configuration.service';
import { from ,Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SimdataService {
    private apiURL:string;
  private headers = new HttpHeaders();
   constructor(private httpClient: HttpClient,
    private config:ConfigurationService) {
     this.apiURL= this.config.ApiUrl() + "SimData";
     this.headers =this.headers.set('Authorization',"Bearer "+ this.config.UserToken()); 
     }
 public getSimsData()
 {
  this.headers =this.headers.set('Authorization',"Bearer "+ this.config.UserToken()); 

    // return this.httpClient.get<simRespose>(`${this.apiURL}`);
    return this.httpClient.get<simRespose>(this.apiURL);
 }
public getSimDataOption(attribute:any,pageSize:number,pageNum:number ,search:string="",sortColumn:string="id",sortDir:string='ASC',poolval:any=0)
{
  this.headers =this.headers.set('Authorization',"Bearer "+ this.config.UserToken()); 

  var urlval=`${this.apiURL}?pagesize=${pageSize}&pagenumber=${pageNum}&sortcolumn=${sortColumn}&sortcolumndir=${sortDir}&searchvalue=${search}&attributeName=${attribute}&pool=${poolval}`;
   return this.httpClient.get<simRespose>(urlval,{headers: this.headers});
}
public getAllSimDataOption(pageSize:number,pageNum:number ,search:string="",sortColumn:string="id",sortDir:string='ASC' )
{
  this.headers =this.headers.set('Authorization',"Bearer "+ this.config.UserToken()); 

  var urlval=`${this.apiURL}/getAllSim?pagesize=${pageSize}&pagenumber=${pageNum}&sortcolumn=${sortColumn}&sortcolumndir=${sortDir}&searchvalue=${search}`;
   return this.httpClient.get<simRespose>(urlval,{headers: this.headers});
}
public getpoolforreq(id:number)
  {
  this.headers =this.headers.set('Authorization',"Bearer "+ this.config.UserToken()); 
    return this.httpClient.get<any>(`${this.apiURL}/getrequestpool/${id}`,{headers: this.headers});
  }
  public getSimData(id:number)
  {
    return this.httpClient.get<simResposeData>(`${this.apiURL}/${id}`,{headers: this.headers});
  }public getSimDataEXel():Observable < Blob >
  {
    return this.httpClient.get(`${this.apiURL}/DownloadEmptyExcel`,
    {responseType: 'blob',headers: this.headers}); 
  }
  public addSimfile(Val:FormData,id:number,pool:number)
  {
    debugger
    return this.httpClient.post<any>(`${this.apiURL}/AddFromFile/${id}/${pool}`,Val,{headers: this.headers});
  }
  public addSimData(Val:simdataModel) 
  {
    return this.httpClient.post<simResposeData>(`${this.apiURL}`,Val,{headers: this.headers});
  }
  public editSimData(Val:simdataModel)
  {
    //return this.httpClient.put<simResposeData>(this.apiURL,Val,{headers: this.headers});
    return this.httpClient.post<simResposeData>(this.apiURL+"/UpdateSimData",Val,{headers: this.headers});
  
  }
  public delSimData(Val:number)
  { 
   // return this.httpClient.delete<simResposeData>(this.apiURL + "/" + Val,{headers: this.headers});
    return this.httpClient.get<simResposeData>(this.apiURL + "/RemoveSimData/" + Val,{headers: this.headers});
    
  }

  public getAllSimDataEXel(search :any ,rId:any=0,pool:any=0):Observable < Blob >
  {
    return this.httpClient.get(`${this.apiURL}/ExpotExcel?search=${search}&reqId=${rId}&poolId=${pool}`,
    {responseType: 'blob',headers: this.headers}); 
  }
}

