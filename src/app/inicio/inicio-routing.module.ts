import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { ErrorComponent } from '../error/error.component';

const routes: Routes = [
  //{ path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: ErrorComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule { }
