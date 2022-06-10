import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser:any = "";
  isLogin: boolean = false;
  constructor(
    private http:HttpClient,
    private router:Router
    ) {
    this.currentUser = sessionStorage.getItem("token");
  }

  login(username: string, password: string) {
   return this.http.post("https://iamumut.test/api/userLogin", {
        username: username,
        password: password,
      });
  }

  checkTokenUser():any {
    if(this.currentUser != null){
      return this.http.post("https://iamumut.test/api/checkToken", {
        token: this.currentUser,
      });
    }

  }

  logout() {
    sessionStorage.clear();
    this.isLogin = false;
  }
}
