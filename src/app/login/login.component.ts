import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private http:HttpClient) { }
  username: string = "";
  password: string = "";
  rememberMe: boolean = false;

  login(): void {
    if(this.username == "" || this.password == ""){
      alert("Please fill in all fields");
    }else if (this.password.length < 6) {
      alert("Passwords must be at least 6 characters long");
      return;
    }else if (this.username.length < 6) {
      alert("Username must be at least 6 characters long");
      return;
    }else{
    this.http.post("https://iamumut.test/api/userLogin", {
      username: this.username,
      password: this.password,
    }).subscribe(
      (data:any) => {
        if(data['success']) {
          alert("Login successfull");
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
