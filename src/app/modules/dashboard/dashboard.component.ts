import {Component, ViewChild , OnInit,ElementRef ,TemplateRef,Input, Output, EventEmitter } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator,PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
//import { EmpformComponent } from '../empform/empform.component';
import { EmpService } from 'src/app/shared/services/emp.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { RequestSerService } from 'src/app/shared/services/request-ser.service';
import { RequestCls } from 'src/app/Model/RequestCls';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService} from 'src/app/shared/services/notification.service';
//import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Title } from '@angular/platform-browser';
//import * as XLSX from 'xlsx';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpClient, HttpResponse, HttpRequest, HttpEventType, HttpErrorResponse } from '@angular/common/http';
 import { Subscription } from 'rxjs';
 import { of } from 'rxjs';
 import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
 import { ConfigurationService } from 'src/app/shared/services/configuration.service';
//  import { of } from 'rxjs/observable/of';
import { catchError, last, map, tap, } from 'rxjs/operators';
import {Chart, ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label,MultiDataSet } from 'ng2-charts';
import { NotifyserService } from 'src/app/shared/services/notifyser.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  
})
export class DashboardComponent implements OnInit {
  dmvpnCount='0';
  pcCount='0';
 dmvpnlist:any[]=[]
 pclist:any[]=[]


  constructor(private dialog: MatDialog,public service:EmpService ,
    private dialogService:DialogService,private reqser: RequestSerService ,
    private route: ActivatedRoute, private notifyser:NotifyserService,
    private router: Router, private notser:NotificationService,
    private titleService : Title,
    private config: ConfigurationService,
    private _http: HttpClient,
    private _bottomSheet: MatBottomSheet
    )
  {
    this.config.IsAuthentecated();
    this.titleService.setTitle('4G | Home');
    
     
 
  }
  nullDMVPN=0;
  nullPC=0;
  //{"data":{"dmvpn":6,"pcConnect":2,"dmvpnDetails":[{"key":"pending epm","value":3},{"key":" pending presales","value":3},{"key":" pending operation","value":0},{"key":" pending esp","value":0},{"key":"getting APN from core","value":0},{"key":" complete","value":0}],"pcConnectDetails":[{"key":"pending epm","value":2},{"key":" pending presales","value":0},{"key":" pending operation","value":0},{"key":" pending esp","value":0},{"key":"getting APN from core","value":0},{"key":" complete","value":0}]}}
  ngOnInit(){

     this.notifyser.getflowchart().subscribe(x=>{
      console.log(x);
      if(x.status==true){
        this.dmvpnCount=x.data.dmvpn as string;
        this.pcCount=x.data.pcConnect as string;  
        this.dmvpnlist=x.data.dmvpnDetails;
        this.pclist=x.data.pcConnectDetails;
        this.dmvpnlist.forEach(item => {
         
          this.nullDMVPN+=item.value
        });

        this.pclist.forEach(item => {
         
          this.nullPC+=item.value
        });
        let pcOfNull={key:"Null Value",value:Number(this.pcCount)-this.nullPC}
        this.pclist.push(pcOfNull);
        let DMOfNull={key:"Null Value",value:Number(this.dmvpnCount)-this.nullDMVPN}
        this.dmvpnlist.push(DMOfNull);
      }
      else{
        this.notser.warn(x.error);
    
      }
      },err=>{
        if(err.status==401)
        this.router.navigate(['/login']);
        else 
        this.notser.warn("! Fail");
       
      })
  }





  /////////////////donut chart//////////////////
  doughnutChartLabels: Label[] = [];
  doughnutChartData: MultiDataSet = [
    []
  ];
  doughnutChartLabelsp: Label[] = [];
  doughnutChartDatap: MultiDataSet = [
    []
  ];
  // doughnutChartLabels: Label[] = ['BMW', 'Ford', 'Tesla'];
  // doughnutChartData: MultiDataSet = [
  //   [55, 25, 20]
  // ];
  doughnutChartType: ChartType = 'doughnut';
  colors: Color[] = [
    {
      backgroundColor: [
        'Salmon','red',
        'green',
        'blue','yellow','pink','orange','purple','brown','DeepPink','DarkOrange'
      ]
    }
  ];
 
//////////line chart//////////////////////
lineChartData: ChartDataSets[] = [
  { data: [85, 72, 78, 75, 77, 75], label: 'Crude oil prices' },
];

lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

 lineChartOptions:ChartOptions = {
  responsive: true,
};

 lineChartColors: Color[] = [
  {
    borderColor: 'black',
    backgroundColor: 'rgba(255,255,0,0.28)',
  },
];

 lineChartLegend = true;
 lineChartPlugins = [];
 lineChartType:ChartType = 'line';



/////////bar chart/////////////////////////
barChartOptions: ChartOptions = {
  responsive: true,
};
barChartLabels: Label[] = ['Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes'];
barChartType: ChartType = 'bar';
barChartLegend = true;
barChartPlugins = [];

barChartData: ChartDataSets[] = [
  { data: [45, 37, 60, 70, 46, 33], label: 'Best Fruits' }
];


}