import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private http: HttpClient,private router: Router)  { }
  username: string = "";
  password: string = "";
  password2: string = "";
  registerButtonStatus = false;
  emailStatus:boolean = false;
  passwordStatus:boolean = false;
  samePassword:boolean = false;
  password2Status:boolean = false;

  validateInputs(event:any,type:string){
      if(type=='username'){
        event.target.value.length>5 ? this.emailStatus = true : this.emailStatus = false;
      }else if(type=='password'){
        event.target.value.length>5 ? this.passwordStatus = true : this.passwordStatus = false;
      }else if(type=='password2'){
        event.target.value.length>5 ? this.password2Status = true : this.password2Status = false;
      }
      this.password === this.password2 && this.password2Status && this.passwordStatus ? this.password2Status = true : this.password2Status = false;
      let allCheck = this.emailStatus && this.passwordStatus && this.password2Status;
      allCheck ? this.registerButtonStatus = true : this.registerButtonStatus = false;
  }
  register(){
    let allCheck = this.emailStatus && this.passwordStatus && this.password2Status;
    if(!allCheck){
      alert("Please check all fields");
      return;
    }else{
      this.http.post("https://iamumut.test/api/userRegister", {
        username: this.username,
        password: this.password,
      }).subscribe(
        (data:any) => {
          if(data['success']) {
            alert("Register successfully, please login");
            this.router.navigate(['/login']).then(r => {}).catch(e => {});
          }
        },
        (error:any) => {
          console.log(error);
          alert(error.error.message);
        }
      );
    }
  }

}
