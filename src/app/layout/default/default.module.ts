import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule} from '@angular/flex-layout';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { EmployeeComponent } from 'src/app/modules/employee/employee.component';
import { DefaultComponent } from './default.component';
import { MaterialModule } from 'src/app/material/material/material.module';
import { SidenavListComponent } from 'src/app/navigation/sidenav-list/sidenav-list.component';
import { HeaderComponent } from 'src/app/navigation/header/header.component';
import { EmpformComponent } from 'src/app/modules/empform/empform.component';
import {  PanelComponent} from 'src/app/modules/panel/panel.component';
import { SimdetailComponent } from 'src/app/modules/simdetail/simdetail.component';

import {StepperComponent} from 'src/app/modules/stepper/stepper.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EmpService } from 'src/app/shared/services/emp.service';
 import { PickListSerService } from 'src/app/shared/services/pick-list-ser.service';
 import { RequestSerService } from 'src/app/shared/services/request-ser.service';
 import {  ConfigurationService } from 'src/app/shared/services/configuration.service';
 import { SIMDataComponent} from 'src/app/modules/simdata/simdata.component';
import { HttpClientModule } from '@angular/common/http';
// import{LoginserService} from'src/app/shared/services/loginser.service'; 
//import { LoginpageComponent } from 'src/app/modules/loginpage/loginpage.component';
import { BrowserModule, Title } from '@angular/platform-browser';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { SettingComponent } from 'src/app/modules/setting/setting.component'
import { PcConnectReqComponent } from 'src/app/modules/pc-connect-req/pc-connect-req.component';
import { PcConnectReqDetailComponent } from 'src/app/modules/pc-connect-req-detail/pc-connect-req-detail.component';
import {  NotifyserService } from 'src/app/shared/services/notifyser.service';
import { TeamcontactComponent } from 'src/app/modules/teamcontact/teamcontact.component';
import { APNWorkedFrom1stTestComponent } from 'src/app/modules/apnworked-from1st-test/apnworked-from1st-test.component';
import { ContractTypeComponent } from 'src/app/modules/contract-type/contract-type.component';
import { CurrentStatusComponent } from 'src/app/modules/current-status/current-status.component';
import { TestSimDataSerialComponent } from 'src/app/modules/test-sim-data-serial/test-sim-data-serial.component';
import { APNConclusionComponent } from 'src/app/modules/apnconclusion/apnconclusion.component';
import { APNConclusionDetailComponent } from 'src/app/modules/apnconclusion-detail/apnconclusion-detail.component';
 
import { MatConfirmDialogComponent} from 'src/app/shared/components/mat-confirm-dialog/mat-confirm-dialog.component';
import { DMVPNRequestComponent } from 'src/app/modules/dmvpnrequest/dmvpnrequest.component';
import { ChartsModule } from 'ng2-charts';   
import { LogdataComponent } from 'src/app/modules/logdata/logdata.component';
import { AllSimComponent } from 'src/app/modules/all-sim/all-sim.component';
import {  TeamcontactService } from 'src/app/shared/services/teamcontact.service';
import {  APNWorkedFrom1stTestService } from 'src/app/shared/services/apnworked-from1st-test.service';
import {  ContractTypeService } from 'src/app/shared/services/contract-type.service';
import {  CurrentStatusService } from 'src/app/shared/services/current-status.service';
import {  TestSimDataSerialService } from 'src/app/shared/services/test-sim-data-serial.service';
import {  APNConclusionService } from 'src/app/shared/services/apnconclusion.service';

@NgModule({
  declarations: [
    DefaultComponent,
    HeaderComponent,
    SidenavListComponent,
    DashboardComponent,
    EmployeeComponent,
    StepperComponent,
    EmpformComponent,
    PanelComponent,
    SettingComponent ,
    SIMDataComponent,
    MatConfirmDialogComponent,
    AllSimComponent,
    SimdetailComponent,
    PcConnectReqComponent,
    PcConnectReqDetailComponent,
    DMVPNRequestComponent,TeamcontactComponent,
    PcConnectReqDetailComponent,DMVPNRequestComponent,LogdataComponent,
    APNWorkedFrom1stTestComponent,ContractTypeComponent,
    CurrentStatusComponent,TestSimDataSerialComponent,APNConclusionComponent,
    APNConclusionDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
     HttpClientModule,
     ScrollingModule,
     BrowserModule, ChartsModule
 
  ],
  providers:[
    TeamcontactService, NotifyserService,EmpService,RequestSerService,PickListSerService,Title,ConfigurationService
    ,APNWorkedFrom1stTestService,ContractTypeService,CurrentStatusService,TestSimDataSerialService,
    APNConclusionService
    // EmpService ,RequestSerService,PickListSerService,LoginserService
  ],
  entryComponents:[MatConfirmDialogComponent]


})
export class DefaultModule { }
