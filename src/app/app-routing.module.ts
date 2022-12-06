import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DefaultComponent} from './layout/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { EmployeeComponent } from './modules/employee/employee.component';
import {PanelComponent} from './modules/panel/panel.component';
import {StepperComponent} from './modules/stepper/stepper.component';
import {SIMDataComponent} from './modules/simdata/simdata.component';
import {SimdetailComponent} from './modules/simdetail/simdetail.component';
import  {LoginpageComponent} from './modules/loginpage/loginpage.component'
import {SettingComponent} from './modules/setting/setting.component';
import {TeamcontactComponent} from './modules/teamcontact/teamcontact.component';
import { AllSimComponent } from 'src/app/modules/all-sim/all-sim.component';

import {PcConnectReqComponent} from './modules/pc-connect-req/pc-connect-req.component';
import {PcConnectReqDetailComponent} from './modules/pc-connect-req-detail/pc-connect-req-detail.component';
import { DMVPNRequestComponent } from 'src/app/modules/dmvpnrequest/dmvpnrequest.component';
import { LogdataComponent } from 'src/app/modules/logdata/logdata.component';
import { APNWorkedFrom1stTestComponent } from 'src/app/modules/apnworked-from1st-test/apnworked-from1st-test.component';
import { ContractTypeComponent } from 'src/app/modules/contract-type/contract-type.component';
import { CurrentStatusComponent } from 'src/app/modules/current-status/current-status.component';
import { TestSimDataSerialComponent } from 'src/app/modules/test-sim-data-serial/test-sim-data-serial.component';
import { APNConclusionComponent } from 'src/app/modules/apnconclusion/apnconclusion.component';

const routes: Routes = [
  {
    path:'login',
    component:LoginpageComponent,

  },
  { path:'',
    component:DefaultComponent,
    children:[{
      path:'',
      component:DashboardComponent,
    },
    {
      path:'request',
      component:EmployeeComponent,
    }, 
    {
      path:'allSim',
      component:AllSimComponent,
    }, 
    {
      path:'Simdetail',
      component:SimdetailComponent,
    }, 
    {
      path:'contacts',
      component:TeamcontactComponent,
    },
    
    {
      path:'simdata',
      component:SIMDataComponent,
    },
    {
      path:'steps', 
      component:StepperComponent,

    },
    {
      path:'TestSimSerial',//
      component:TestSimDataSerialComponent,
    },
    {
      path:'CurrentStatus',//CurrentStatus
      component:CurrentStatusComponent,
    },
    {
      path:'ContractType',//ContractType
      component:ContractTypeComponent,
    },
    {
      path:'APNWorkedFrom1stTest',//ist
      component:APNWorkedFrom1stTestComponent,
    },
    {
      path:'settings',
      component:SettingComponent,

    },//PcConnectReqComponent
    {
      path:'pcconnectrequest',
      component:PcConnectReqComponent,

    },//LogdataComponent
    {
      path:'pcconnectreqdetail',
      component:PcConnectReqDetailComponent,

    },//DMVPNRequestComponent
    {
      path:'apnconclusion',
      component:APNConclusionComponent,

    },
    {
      path:'dmvpnrequest',
      component:DMVPNRequestComponent,

    },{
      path:'logdata',
      component:LogdataComponent,

    },
  ]
  }
//
 
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
