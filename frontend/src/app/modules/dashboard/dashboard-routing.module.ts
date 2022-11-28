import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RootBoardComponent } from './components/root-board/root-board.component';
import { AppGuard } from 'src/app/app.guard';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { ViewTaskComponent } from './components/view-task/view-task.component';
import { UserTasksComponent } from './components/user-tasks/user-tasks.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [AppGuard],
    component: RootBoardComponent,
  },
  {
    path: 'task',
    canActivate: [AppGuard],
    children: [
      {
        path: 'create',
        component: AddTaskComponent,
      },
      {
        path:':taskId',
        component: ViewTaskComponent,
      },
    ]
  },
  {
    path:'my-tasks',
    component: UserTasksComponent,
  },
  { path: "**", redirectTo: "/" },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
