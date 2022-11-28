import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { Status, StatusesColor, Task, StatusType } from 'src/app/models/data-models';
import { UserService } from 'src/app/modules/account/services/user.service';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dash-track',
  templateUrl: './dash-track.component.html',
  styleUrls: ['./dash-track.component.scss']
})
export class DashTrackComponent implements OnInit {
  @Input() status!: Status

  tasks: Task[] = []
  statusesColor = StatusesColor

  constructor(
    protected dashboard: DashboardService,
    protected user: UserService,
  ) { }

  ngOnInit(): void {
    this.loadTasks()
  }

  loadTasks(): void {
    const dashId = this.user.getDashboardId()
    if (dashId) {
      this.dashboard.getTasks(dashId, {status: this.status.name}).subscribe(
        (res) => {
          this.tasks = res
        },
        (err: HttpErrorResponse) => {
          notify({ message: "Failed to load data", type: "error", width: "auto"});
        }
      )
    }
  }

  getTaskStyle(name: string): string {
    return 'border-left: 2px solid '+ this.statusesColor[name  as StatusType]+';'
  }

}
