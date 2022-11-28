import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import notify from 'devextreme/ui/notify';
import { Status, Task } from 'src/app/models/data-models';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss']
})
export class ViewTaskComponent implements OnInit{
  task!: Task
  statuses: Status[] = []

  constructor(
    protected route: ActivatedRoute,
    protected dashboard: DashboardService,
  ) {
    this.route.params.subscribe(params => {
      this.loadTask(params['taskId'])
    });
  }
  
  ngOnInit(): void {
    this.getStatuses()
  }
  
  getStatuses(): void {
    this.dashboard.getAllStatuses()
    .subscribe(
      (res) => {
        this.statuses = res
      }
    ) 
  }

  loadTask(id: string): void {
    this.dashboard.getTaskById(id)
    .subscribe(
      (res) => {
        this.task = res
      },
      (err: HttpErrorResponse) => {
        notify({ message: "Failed to load data", type: "error", width: "auto"});
      }
    )
  }

  changeTaskStatus(e: any): void {
    if (e.selectedItem.id && e.selectedItem.id !== this.task.status._id) {
      this.dashboard.updateTask(this.task._id, {status_id: e.selectedItem.id})
      .subscribe(
        (res) => {
          this.task = res
        },
        (err: HttpErrorResponse) => {
          notify({ message: "Failed to load data", type: "error", width: "auto"});
        }
      )
    }
  }
}
