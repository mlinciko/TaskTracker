import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './components/register/register.component';
import { AuthRootComponent } from './components/auth-root/auth-root.component';
import { LoginComponent } from './components/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { DxModule } from '../dx-module/dx.module';



@NgModule({
  declarations: [
    AuthRootComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    DxModule,
  ]
})
export class AuthModule { }
