import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser, User } from '../../../models/data-models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  restUrl = `${environment.baseUrl}/api/user/`
  
  user: BehaviorSubject<User> = new BehaviorSubject<User>(new User())

  constructor(
    protected http: HttpClient,
  ) { }

  initUser(user: IUser | null) {
    this.user.next(new User(user))
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
          if (res) {
            this.initUser(res)
            return { status: true, user: res }
          }
          return { status: false }
        }
      )
    )
  }

  update(user: IUser): Observable<IUser> {
    const header = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem("__access_token")}`})
    return this.http.put<IUser>(`${this.restUrl}update/`, user, { headers: header})
  }

  updatePassword(data: {current_password: string, new_password: string, user_id: string}): Observable<any> {
    const header = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem("__access_token")}`})
    return this.http.patch(`${this.restUrl}change-password/`, data, { headers: header})
  }

  getEmployees(orgId: string): Observable<IUser[]> {
    const header = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem("__access_token")}`})
    return this.http.get<IUser[]>(`${this.restUrl}employees/`, { params: { organisation_id: orgId }, headers: header })
  }

  removeUser(id: string): Observable<any> {
    const header = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem("__access_token")}`})
    return this.http.delete(`${this.restUrl}remove/`, { params: { user_id: id }, headers: header })
  }

  getUser(): IUser {
    return this.user.value.fullUser
  }

  getUserId(): string {
    return this.user.value.id
  }

  getOrganisationId(): string | undefined{
    return this.user.value.getOrganisationId
  }

  setOrganisationId(id: string): void {
      this.user.value.setOrganisationId = id
  }

  isMaximumUser(): boolean {
    if (this.user.value.accessLevel === 'maximum')
      return true
    else return false
  }

  isMediumUser(): boolean {
    if (this.user.value.accessLevel === 'medium' || this.user.value.accessLevel === 'maximum')
      return true
    else return false
  }
}
