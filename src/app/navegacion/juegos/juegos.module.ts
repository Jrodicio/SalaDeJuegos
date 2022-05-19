import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosComponent } from './juegos.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';
import { MayorOMenorComponent } from './mayor-o-menor/mayor-o-menor.component';
import { EscapeDinosaurioComponent } from './escape-dinosaurio/escape-dinosaurio.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { LetrasComponent } from './ahorcado/letras/letras.component';

import { JuegosRoutingModule } from './juegos-routing.module';

//Servicios
import { PalabrasApiService } from './../../providers/palabras/palabras-api.service';




@NgModule({
  declarations: [
    AhorcadoComponent,
    MayorOMenorComponent,
    PreguntadosComponent,
    JuegosComponent,
    LetrasComponent,
    EscapeDinosaurioComponent,
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule,
  ],
  providers: [
    PalabrasApiService,
  ],
})
export class JuegosModule { }
