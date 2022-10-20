import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootBoardComponent } from './components/root-board/root-board.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DxModule } from '../dx-module/dx.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    RootBoardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DxModule,
    SharedModule,
  ]
})
export class DashboardModule { }
