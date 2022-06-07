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

  register(){
    if(this.username == "" || this.password == "" || this.password2 == ""){
      alert("Please fill in all fields");
    }else if (this.password.length < 6) {
      alert("Passwords must be at least 6 characters long");
      return;
    }else if (this.username.length < 6) {
      alert("Username must be at least 6 characters long");
      return;
    }else if (this.password != this.password2) {
      alert("Passwords do not match");
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
