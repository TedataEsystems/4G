import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ConfigurationService } from 'src/app/shared/services/configuration.service';
import { TeamcontactService } from 'src/app/shared/services/teamcontact.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
@Output() sidenavClose= new EventEmitter();
  constructor(private teamser:TeamcontactService,private titleService: Title,private conf :ConfigurationService) { }
  public setTitle(newTitle: string) {
    debugger;
    //this.titleService.setTitle("4G | "+ newTitle);
    this.onSidenavClose();
  
  } //Customer Port Or AllowAny
  //Customer Directions
  teamlist:any[]=[]
  isesp=false;
  versions=["forecast","vrf","ipallocation","billing approval confirmation","problem","core comment","epm comment","consultancy comment",'case periority','apn type','sim status'
        ,'Customer Port Or AllowAny','Customer Directions','customer testing tool'];

  ngOnInit(): void { debugger
    var team=  this.conf.UserTeam();
    if(team?.toLocaleLowerCase()=='esp')
      this.isesp=true;

      this.teamser.getteams().subscribe(x=>{
       
        this.teamlist=x.data;
        
      })
     
  }
 
  public onSidenavClose =() =>{
    this.sidenavClose.emit();
  }

 ishide=true;
  isExpanded = true;
  isExpandedT = true;
  showSubmenu: boolean = false;
  showSubmenuT: boolean = false;
  isShowing = false;
  isShowingT = false;
  showSubSubMenu: boolean = false;

  

  show(){
    this.showSubmenu = !this.showSubmenu;
    this.ishide= !this.ishide;
    // this.onClick("set1");

  }
  showteam(){
    this.showSubmenuT = !this.showSubmenuT;
    //this.onClick("set1");

  }
}
