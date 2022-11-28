import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IComment } from 'src/app/models/data-models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  restUrl = `${environment.baseUrl}/api/comment/`

  constructor(
    protected http: HttpClient,
  ) { }

  getCommentsByTask(taskId: string): Observable<IComment[]> {
    return this.http.get<IComment[]>(this.restUrl + `task?task_id=${taskId}`)
  }

  updateComment(payload: {comment_id: string, body: string}): Observable<IComment> {
    return this.http.patch<IComment>(this.restUrl, payload)
  }

  removeComment(id: string): Observable<string> {
    return this.http.delete<string>(this.restUrl + `?comment_id=${id}`)
  }

  createComment(payload: any): Observable<IComment> {
    return this.http.post<IComment>(this.restUrl, payload)
  }


}
