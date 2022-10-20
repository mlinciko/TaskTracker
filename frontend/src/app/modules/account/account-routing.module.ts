import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppGuard } from 'src/app/app.guard';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { OrgAccComponent } from './components/org-acc/org-acc.component';
import { PersonAccComponent } from './components/person-acc/person-acc.component';
import { RootAccountComponent } from './components/root-account/root-account.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AppGuard],
    component: RootAccountComponent,
    children: [
      {
        path: '',
        component: PersonAccComponent,
      },
      {
        path: 'organisation',
        component: OrgAccComponent,
      },
      {
        path: 'employees',
        component: EmployeesListComponent,
      },
    ]
  },
  { path: "**", redirectTo: "/person" },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
