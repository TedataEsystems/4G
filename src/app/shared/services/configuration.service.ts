import { Injectable } from '@angular/core';
import {Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
 // Apiurl:string = "http://localhost:18223/api/";//18223///18223
//Apiurl:string = "http://localhost:5000/api/";//18223/// 
//Apiurl:string = "http://172.29.29.80:2021/api/";
//Apiurl:string="http://172.29.29.80:2022/api/";//test
//Apiurl:string="http://172.29.29.8:1800/api/";//test
  Apiurl:string="http://localhost:18223/api/";//test

  constructor(  private router: Router)
   {   }

   ApiUrl()
 
    {
       return this.Apiurl;
    }
     
   UserName()
   {
       return localStorage.getItem("usernam");
   }
   UserTeam()
   {
       return localStorage.getItem("teamName");
   }
   UserToken()
   {
       return localStorage.getItem("tokNum");
   }

   IsAuthentecated()
   {
     if(!this.UserToken() || !this.UserName() || !this.UserTeam() )
     {
      this.router.navigateByUrl('/login');
     }
   }

   Logout()
   {
  
    localStorage.removeItem("teamName");
    localStorage.removeItem("tokNum");
    localStorage.removeItem("usernam");
   }
    
}
