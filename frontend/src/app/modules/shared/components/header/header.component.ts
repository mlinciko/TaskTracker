import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    protected router: Router,
    protected auth: AuthService,
  ) { }

  ngOnInit(): void {
  }

  navigateTo(route: string): void {
    this.router.navigate([`/${route}`])
  }

  logout(): void {
    this.auth.logout()
  }

}
