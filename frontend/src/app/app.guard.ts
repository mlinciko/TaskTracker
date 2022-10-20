import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import notify from 'devextreme/ui/notify';
import { Observable } from 'rxjs';
import { AuthService } from './modules/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanActivate {
  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if (this.auth.checkToken()) {
      return true;
    }
    else {
      this.router.navigate(["/"])
      notify({ message: "You are not authorized", type: "error", width: "auto"});
      return false;
    }
  }
  
}
