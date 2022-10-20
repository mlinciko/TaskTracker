import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootAccountComponent } from './components/root-account/root-account.component';
import { AccountRoutingModule } from './account-routing.module';
import { DxModule } from '../dx-module/dx.module';
import { PersonAccComponent } from './components/person-acc/person-acc.component';
import { OrgAccComponent } from './components/org-acc/org-acc.component';
import { SharedModule } from '../shared/shared.module';
import { AddPersonDialogComponent } from './components/add-person-dialog/add-person-dialog.component';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';



@NgModule({
  declarations: [
    RootAccountComponent,
    PersonAccComponent,
    OrgAccComponent,
    AddPersonDialogComponent,
    EmployeesListComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    DxModule,
    SharedModule,
  ]
})
export class AccountModule { }
