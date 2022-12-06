import { BrowserModule,Title  } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MaterialModule} from './material/material/material.module';
import {DefaultModule } from './layout/default/default.module';
import  {LoginModule} from 'src/app/modules/loginpage/login/login.module';
import { ChartsModule } from 'ng2-charts';
 

@NgModule({
  declarations: [
    AppComponent,
 
      
   
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    NgbModule,
    MaterialModule,
    LoginModule,
    ChartsModule
    
  //  FormsModule,
  
  ],
   providers: [
    //Title
  ], 
  bootstrap: [AppComponent]
}) 
export class AppModule { }
