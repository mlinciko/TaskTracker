import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser, User } from '../../../models/data-models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  restUrl = `${environment.baseUrl}/api/user/`
  
  protected user!: User

  constructor(
    protected http: HttpClient,
  ) { }

  initUser(user: IUser) {
    this.user = new User(user)
  }

  getUserByToken(): Observable<any> {
    let customHeaders = new HttpHeaders({
      'X-Verification-Code': 'verification_code',
      'X-Cookie': `${localStorage.getItem("__refresh_token")}`,
    });
    return this.http.get(`${this.restUrl}`, { headers: customHeaders})
    .pipe(
      map(
        (res: any) => {
          if (res.user) {
            return { status: true, user: res.user }
          }
          return { status: true }
        }
      )
    )
  }

  update(user: IUser): Observable<{user: IUser}> {
    const header = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem("__access_token")}`})
    return this.http.put<{user: IUser}>(`${this.restUrl}update/`, user, { headers: header})
  }
}
