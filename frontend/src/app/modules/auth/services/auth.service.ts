import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError, timeout, TimeoutError } from 'rxjs';
import { IUser } from 'src/app/models/data-models';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";
import { UserService } from '../../account/services/user.service';
import { Router } from '@angular/router';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  restUrl = `${environment.baseUrl}/api/auth/`

  protected accessToken!: string

  constructor(
    protected http: HttpClient,
    protected user: UserService,
    protected router: Router,
  ) {
   }

  initAuthData(data: {user: IUser, accessToken: string}): void {
    this.accessToken = data.accessToken
  }

  register(user: IUser): Observable<any> {
    return this.http.post(`${this.restUrl}register/`, user)
    .pipe(
      timeout(30000),
      map(
        (res: any) => {
          if (res.user && res.accessToken && res.refreshToken) {
            this.initAuthData(res)
            this.user.initUser(res.user)
            localStorage.setItem("__access_token", this.accessToken);
            localStorage.setItem("__refresh_token", res.refreshToken)
            return { status: true, message: "Registration completed successfully" }
          }
          return { status: true, message: "Registration Error" }
        }
      ),
      catchError((e) => {
        if (e instanceof TimeoutError) {
          return throwError("Server not responding");
        }
        return throwError(
          e.error.message
        );
      })
    )
  }

  login(data: {email: string, password: string}): Observable<any> {
    return this.http.post(`${this.restUrl}login/`, data)
    .pipe(
      timeout(30000),
      map(
        (res: any) => {
          if (res.user && res.accessToken && res.refreshToken) {
            this.initAuthData(res)
            this.user.initUser(res.user)
            localStorage.setItem("__access_token", this.accessToken);
            localStorage.setItem("__refresh_token", res.refreshToken);
            return { status: true, message: "Authorization completed successfully" }
          }
          return { status: true, message: "Authorisation Error" }
        }
      ),
      catchError((e) => {
        console.log(e)
        if (e instanceof TimeoutError) {
          return throwError("Server not responding");
        }
        return throwError(
          e.error.message
        );
      })
    )
  }

  logout(): void {
    localStorage.removeItem("__access_token");
    localStorage.removeItem("__refresh_token");
    this.user.initUser(null)
    this.router.navigate(['/'])
  }

  registerByAdmin(orgId: string, user: IUser): Observable<any> {
    const header = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem("__access_token")}`})
    return this.http.post(`${this.restUrl}register-by-admin/`, {...user, organisation_id: orgId}, {headers: header } )
    .pipe(
      map(
        (res: any) => {
          if (res.user && res.accessToken && res.refreshToken) {
            return { status: true, message: "Registration completed successfully" }
          }
          return { status: true, message: "Registration Error" }
        }
      ),
      timeout(30000),
      catchError((e) => {
        if (e instanceof TimeoutError) {
          return throwError("Server not responding");
        }
        return throwError(
          e.error.message
        );
      })
    )
  }

  checkToken(): boolean {
    if (localStorage.getItem("__access_token") && localStorage.getItem("__refresh_token"))
      return true
    else return false
  }

  decode(): any {
    return helper.decodeToken(this.accessToken);
  }

}
