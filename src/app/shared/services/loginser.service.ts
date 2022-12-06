import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {ConfigurationService} from'src/app/shared/services/configuration.service';
import{Login}from'src/app/Model/Logincls';
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginserService {

  apiURL: string ="";
  constructor(private httpClient: HttpClient, private config: ConfigurationService) {
    this.apiURL= this.config.ApiUrl() + "account";
   }
  public getLogin(model: Login)
  {
    return this.httpClient.post<any>(this.apiURL,model);
  }
}
