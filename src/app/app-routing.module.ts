import { NavbarComponent } from './navbar/navbar.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { LoginComponent } from './login/login.component';
import { QuienSoyComponent } from './quien-soy/quien-soy.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { RegisterComponent } from './register/register.component';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent , children: [
    { path: 'loading-screen', component: LoadingScreenComponent },
  ]},
  { path: 'register', component: RegisterComponent },
  { path: 'loading-screen', component: LoadingScreenComponent },
  { path: 'home', component: NavbarComponent, children: [
    {path: '', component: HomeComponent},
    { path: 'loading-screen', component: LoadingScreenComponent },
    { path: 'quien-soy', component: QuienSoyComponent },
    { path: '**', component: ErrorComponent },
    ]
  },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
