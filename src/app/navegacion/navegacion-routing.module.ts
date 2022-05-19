import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { QuienSoyComponent } from './quien-soy/quien-soy.component';

import { ErrorComponent } from '../error/error.component';
import { DatosJugadorComponent } from './datos-jugador/datos-jugador.component';


const routes: Routes = [

  { path: '', component: HomeComponent, children: [
    { path: '', component: DatosJugadorComponent},
    { path: 'quien-soy', component: QuienSoyComponent},
    {
      path: 'juegos',
      loadChildren: () => import('./juegos/juegos.module').then(m =>
        m.JuegosModule)
    },
    { path: '**', component: ErrorComponent },
  ] },
  { path: '**', component: ErrorComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavegacionRoutingModule { }
