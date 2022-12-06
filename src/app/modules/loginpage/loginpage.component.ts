import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import{LoginserService}from'src/app/shared/services/loginser.service';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import{Login}from'src/app/Model/Logincls';
import { ConfigurationService } from 'src/app/shared/services/configuration.service';
import { NotificationService} from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {
  form: FormGroup=new FormGroup({
    username: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
    
  });
  public loginInvalid: boolean=false;
  private formSubmitAttempt: boolean=false;
  private returnUrl: string='';
  loginmodel:Login ={
    userName:"",
    password:""
  }
  constructor(private serlogin:LoginserService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private notser:NotificationService,
    private titleService: Title,
    private config:ConfigurationService,
    )
    { 
      this.config.Logout();
      this.titleService.setTitle("4G | Login");
    // private titleService: Title
    // ) { 
    //   this.titleService.setTitle("Login");

 
    }

  ngOnInit(): void {
 
  }
    
  onSubmit() {
    //  this.submitted = true; 
  
      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }
    
      this.loginmodel.userName = this.form.value.username;
      this.loginmodel.password = this.form.value.password;
      this.serlogin.getLogin(this.loginmodel).subscribe(res=>{
        
    if(res.status==true){
      localStorage.setItem("tokNum", res.token);
    localStorage.setItem("usernam", res.userData.userName);
    localStorage.setItem("teamName", res.userData.userGroup);
    this.router.navigate(['/'], { relativeTo: this.route });
    }
    else{
      this.notser.warn("Invalid username or password!") ;

    }
    
    // Retrieve
      },err=>{
      this.notser.warn("Invalid username or password!") ;

      });
    
     
  }
}
