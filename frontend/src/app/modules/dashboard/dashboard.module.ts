import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootBoardComponent } from './components/root-board/root-board.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DxModule } from '../dx-module/dx.module';
import { SharedModule } from '../shared/shared.module';
import { DashTrackComponent } from './components/dash-track/dash-track.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { ViewTaskComponent } from './components/view-task/view-task.component';
import { UserTasksComponent } from './components/user-tasks/user-tasks.component';
import { TaskCommentsComponent } from './components/task-comments/task-comments.component';



@NgModule({
  declarations: [
    RootBoardComponent,
    DashTrackComponent,
    AddTaskComponent,
    ViewTaskComponent,
    UserTasksComponent,
    TaskCommentsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DxModule,
    SharedModule,
  ]
})
export class DashboardModule { }
