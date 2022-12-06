 import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ConfigurationService } from 'src/app/shared/services/configuration.service';
 
@Injectable({
  providedIn: 'root'
})

export class NotifyserService {
  //http://172.29.29.8:2021/api/notification
 private apiURL:string;
 private apiURLchart:string='';
  private headers = new HttpHeaders();
   constructor(private httpClient: HttpClient,
    private config:ConfigurationService) {
     this.apiURL= this.config.ApiUrl() + "notification";
     this.apiURLchart= this.config.ApiUrl() + "home/GetFlowchartsData";
     this.headers =this.headers.set('Authorization',"Bearer "+ this.config.UserToken()); 
     }
  public getnotify(){
    
    this.headers =this.headers.set('Authorization',"Bearer "+ this.config.UserToken()); 
    return this.httpClient.get<any>(`${this.apiURL}`,{headers: this.headers});
  }
  //http://172.29.29.8:2021/api/notification/read
 
  public readNotify(){
    this.headers =this.headers.set('Authorization',"Bearer "+ this.config.UserToken()); 

    return this.httpClient.post<any>(`${this.apiURL}/read`,'',{headers: this.headers});
  }
   // flow http://172.29.29.8:2021/api/home/GetFlowchartsData
   public getflowchart(){
   
    this.headers =this.headers.set('Authorization',"Bearer "+ this.config.UserToken()); 
    return this.httpClient.get<any>(`${this.apiURLchart}`,{headers: this.headers});
  }
}

