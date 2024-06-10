import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HostRoutingModule } from './host-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LoginPageComponent,
    RegisterPageComponent,
  ],
  imports: [
    CommonModule,
    HostRoutingModule,
    ReactiveFormsModule,
    MessagesModule,
    MessageModule,
  ],
})
export class HostModule {}
