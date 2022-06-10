import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private http: HttpClient,
    private router: Router,
    private AuthService: AuthService
  ) {  }

  username: string = "";
  usernameStatus: boolean = false;
  password: string = "";
  passwordStatus: boolean = false;
  rememberMe: boolean = false;
  loginButtonStatus: boolean = false;

  validateInputs(event:any,type:string){
    if(type=='username'){
      event.target.value.length>5 ? this.usernameStatus = true : this.usernameStatus = false;
    }else if(type=='password'){
      event.target.value.length>5 ? this.passwordStatus = true : this.passwordStatus = false;
    }

    let allCheck = this.usernameStatus && this.passwordStatus;
    allCheck ? this.loginButtonStatus = true : this.loginButtonStatus = false;
}
  
  login(): void {
    let allCheck = this.usernameStatus && this.passwordStatus;
    if(!allCheck){
      alert("Please fill all fields");
      return;
    }
    let loginStatus:any = this.AuthService.login(this.username, this.password);
    loginStatus.subscribe(
      (data:any) => {
        if(data['success']) {
            alert("Login successfully");
            this.router.navigate(['/home']).then(r => {}).catch(e => {});
        }else{
          alert("Login failed");
        }
      });
  }
}
