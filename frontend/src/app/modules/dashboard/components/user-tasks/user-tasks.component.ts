import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { forkJoin } from 'rxjs';
import { Status, StatusesColor, StatusType, Task } from 'src/app/models/data-models';
import { UserService } from 'src/app/modules/account/services/user.service';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.scss']
})
export class UserTasksComponent implements OnInit {
  tasks: Task[] = []
  statuses: Status[] = []
  statusesColor = StatusesColor

  constructor(
    private dashboard: DashboardService,
    private user: UserService,
  ) { }

  ngOnInit(): void {
    this.loadTasks()
  }

  loadTasks(): void {
    const dashId = this.user.getDashboardId()
    const userId = this.user.getUserId()
    if (dashId && userId) {
      forkJoin(
        this.dashboard.getTasks(dashId, {executorId: userId}),
      )
      .subscribe(
        ([tasks]) => {
          this.tasks = tasks
        },
        (err: HttpErrorResponse) => {
          notify({ message: "Failed to load data", type: "error", width: "auto"});
        }
      )
    }
  }

  getTaskStyle(name: string): string {
    return 'color:'+ this.statusesColor[name  as StatusType]+'; border: 2px solid '+ this.statusesColor[name  as StatusType]+';'
  }

}
