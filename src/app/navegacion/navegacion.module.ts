import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { QuienSoyComponent } from './quien-soy/quien-soy.component';
import { DatosJugadorComponent } from './datos-jugador/datos-jugador.component';

import { NavegacionRoutingModule } from './navegacion-routing.module';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    HomeComponent,
    DatosJugadorComponent,
    QuienSoyComponent,
    ChatComponent,
  ],
  imports: [
    CommonModule,
    NavegacionRoutingModule
  ]
})
export class NavegacionModule { }
