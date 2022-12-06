import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginpageComponent} from 'src/app/modules/loginpage/loginpage.component';
import { MaterialModule } from 'src/app/material/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
// import { PickListSerService } from 'src/app/shared/services/pick-list-ser.service';
// import { RequestSerService } from 'src/app/shared/services/request-ser.service';
import { HttpClientModule } from '@angular/common/http';
import{LoginserService} from'src/app/shared/services/loginser.service'; 
import { BrowserModule, Title } from '@angular/platform-browser';

@NgModule({
  declarations: [
    LoginpageComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule 
    
  ],
  providers:[
   LoginserService,Title
  ],
})
export class LoginModule { }
