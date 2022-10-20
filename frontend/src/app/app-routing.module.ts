import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "account",
        loadChildren: () =>
          import("./modules/account/account.module").then(
            (m) => m.AccountModule
          ),
      },
      {
        path: "dashboard",
        loadChildren: () =>
          import("./modules/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: "",
        loadChildren: () =>
          import("./modules/auth/auth.module").then(
            (m) => m.AuthModule
          ),
      },
    ],
  },
  { path: "**", redirectTo: "/" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
