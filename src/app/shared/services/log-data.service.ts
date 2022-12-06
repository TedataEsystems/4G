
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ConfigurationService } from 'src/app/shared/services/configuration.service';
 
@Injectable({
  providedIn: 'root'
})

export class LogDataService {
 //private apiURL:string="http://172.29.29.8:2021/api/picklist";
 private apiURL:string;
  private headers = new HttpHeaders();
   constructor(private httpClient: HttpClient,
    private config:ConfigurationService) {
     this.apiURL= this.config.ApiUrl() + "log";
     this.headers =this.headers.set('Authorization',"Bearer "+ this.config.UserToken()); 
     }
  public getLogs(){
     
    this.headers =this.headers.set('Authorization',"Bearer "+ this.config.UserToken()); 
    return this.httpClient.get<any>(`${this.apiURL}`,{headers: this.headers});
  }
  public getLogOption(pageSize:number,pageNum:number ,search:string="",sortColumn:string="id",sortDir:string='ASC')
{
  this.headers =this.headers.set('Authorization',"Bearer "+ this.config.UserToken()); 

    var urlval=`${this.apiURL}?pagesize=${pageSize}&pagenumber=${pageNum}&sortcolumn=${sortColumn}&sortcolumndir=${sortDir}&searchvalue=${search}`;
    return this.httpClient.get<any>(urlval,{headers: this.headers});
}
 
  public getLog(id:any){
    return this.httpClient.get<any>(`${this.apiURL}/id`,{headers: this.headers});
  }
   
}

