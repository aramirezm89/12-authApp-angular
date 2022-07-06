import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MainComponent } from './pages/main/main.component';
import { MaterialModule } from '../material/material.module';
import { FlexModule } from '@angular/flex-layout';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, MainComponent],
  imports: [
    AuthRoutingModule,
    CommonModule,
    FlexModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule {}
