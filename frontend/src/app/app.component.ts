import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './modules/account/services/user.service';
import { AuthService } from './modules/auth/services/auth.service';
import { Utils } from './modules/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  constructor(
    protected user: UserService,
    protected auth: AuthService,
    protected router: Router,
  ){
    this.verifyUser()
  }

  verifyUser(): void {
    if (this.auth.checkToken()) {
      this.user.getUserByToken()
      .subscribe(
        (res: any) => {},
        (err: HttpErrorResponse) => {
          Utils.tokenExpiredHandler()
          this.router.navigate(['/'])
        }
      )
    }
    else this.router.navigate(['/'])
  }
}
