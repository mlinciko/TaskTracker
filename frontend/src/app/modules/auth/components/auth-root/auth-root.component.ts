import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/modules/account/services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-root',
  templateUrl: './auth-root.component.html',
  styleUrls: ['./auth-root.component.scss']
})
export class AuthRootComponent implements OnInit {

  constructor(
    protected user: UserService,
    protected auth: AuthService,
    protected router: Router,
  ) { }

  ngOnInit(): void {
    this.checkAuthorization()
  }

  checkAuthorization(): void {
    if (this.auth.checkToken()) {
      this.user.getUserByToken().subscribe(
        (res) => {
          if (res.status) {
            this.router.navigate(['../dashboard'])
          }
        }
      )
    }
  }

}
