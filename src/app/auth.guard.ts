import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanDeactivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private AuthService: AuthService, private router:Router) { }

  canActivate() {
    let currentSession = this.AuthService.checkTokenUser();
    let permissionStatus:boolean = false;
    currentSession.subscribe(
      (data:any) => {
        data['success'] ? permissionStatus = true : permissionStatus = false;
      }
    );
    return true;
  }
}
