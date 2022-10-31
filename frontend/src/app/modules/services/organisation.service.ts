import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IOrganisation } from 'src/app/models/data-models';
import { environment } from 'src/environments/environment';
import { UserService } from '../account/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class OrganisationService {
  restUrl = `${environment.baseUrl}/api/organisation/`

  constructor(
    protected http:HttpClient,
    protected user: UserService,
  ) { }

  getOrganisation(id: string): Observable<IOrganisation> {
    const header = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem("__access_token")}`})
    return this.http.get<IOrganisation>(`${this.restUrl}`, { params: { organisation_id: id }, headers: header})
  }

  create(organisation: IOrganisation): Observable<IOrganisation>  {
    const header = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem("__access_token")}`})
    return this.http.post<IOrganisation>(`${this.restUrl}create/`, {organisation: organisation, user_id: this.user.getUserId()}, { headers: header})
    .pipe(
      map(
        (res) => {
          this.user.setOrganisationId(res.organisation_id)
          return res;
        }
      )
    )
  }

  update(organisation: IOrganisation){
    const header = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem("__access_token")}`})
    return this.http.patch<IOrganisation>(`${this.restUrl}update/`, organisation, { headers: header})
  }
}
