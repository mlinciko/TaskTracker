import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RootBoardComponent } from './components/root-board/root-board.component';
import { AppGuard } from 'src/app/app.guard';


const routes: Routes = [
  {
    path: '',
    canActivate: [AppGuard],
    component: RootBoardComponent,
  },
  { path: "**", redirectTo: "/" },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
