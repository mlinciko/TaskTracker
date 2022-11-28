import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Status, Task } from 'src/app/models/data-models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  restUrl = `${environment.baseUrl}/api/`

  constructor(
    protected http: HttpClient,
  ) { }

  getAllStatuses(): Observable<Status[]> {
    return this.http.get<Status[]>(this.restUrl + 'status/')
  }

  getTasks(dashId: string, searchParams: any): Observable<Task[]> {
    let params = new HttpParams()
    params = params.append('dashboard_id', dashId)
    if (searchParams.status)
      params = params.append('status', searchParams.status)
    if (searchParams.executorId)
      params = params.append('executor_id', searchParams.executorId)
    return this.http.get<Task[]>(this.restUrl + 'task/all/', {params: params})
  }

  createTask(data: any): Observable<Task> {
    return this.http.post<Task>(this.restUrl + 'task/', data)
  }

  getTaskById(taskId: string): Observable<Task> {
    return this.http.get<Task>(this.restUrl + `task/?task_id=${taskId}`)
  }

  updateTask(taskId: string, payload: any): Observable<Task> {
    return this.http.patch<Task>(this.restUrl + `task/?task_id=${taskId}`, payload)
  }
}
