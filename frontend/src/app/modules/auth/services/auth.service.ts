import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { catchError, map, Observable, throwError, timeout, TimeoutError } from 'rxjs';
import { IUser, User } from 'src/app/models/data-models';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  restUrl = `${environment.baseUrl}/api/auth/`

  protected acessToken!: string

  constructor(
    protected http: HttpClient,
  ) {
   }

  initAuthData(data: {user: IUser, accessToken: string}): void {
    this.acessToken = data.accessToken
  }

  register(user: IUser): Observable<any> {
    return this.http.post(`${this.restUrl}register/`, user)
    .pipe(
      timeout(30000),
      map(
        (res: any) => {
          if (res.user && res.accessToken && res.refreshToken) {
            this.initAuthData(res)
            localStorage.setItem("__access_token", this.acessToken);
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
            localStorage.setItem("__access_token", this.acessToken);
            localStorage.setItem("__refresh_token", res.refreshToken);
            return { status: true, message: "Authorization completed successfully" }
          }
          return { status: true, message: "Authorisation Error" }
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

  logout(): void {
    // this.token = "";
    localStorage.removeItem("__access_token");
    localStorage.removeItem("__refresh_token");
  }

  registerByAdmin(user: IUser): Observable<any> {
    return this.http.post(`${this.restUrl}register/`, user)
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

  // getUserByToken(): Observable<any> {
  //   let customHeaders = new HttpHeaders({
  //     'X-Verification-Code': 'verification_code',
  //     'X-Cookie': `${localStorage.getItem("__refresh_token")}`,
  //   });
  //   return this.http.get(`${this.restUrl}`, { headers: customHeaders})
  //   .pipe(
  //     map(
  //       (res: any) => {
  //         if (res.user && res.accessToken && res.refreshToken) {
  //           this.initAuthData(res)
  //           localStorage.setItem("__access_token", this.acessToken);
  //           localStorage.setItem("__refresh_token", res.refreshToken);
  //           return { status: true, message: "Authorization completed successfully", user: res.user }
  //         }
  //         return { status: true, message: "Authorisation Error" }
  //       }
  //     )
  //   )
  // }

  checkToken(): boolean {
    if (localStorage.getItem("__access_token") && localStorage.getItem("__refresh_token"))
      return true
    else return false
  }

  decode(): any {
    return helper.decodeToken(this.acessToken);
  }

}
