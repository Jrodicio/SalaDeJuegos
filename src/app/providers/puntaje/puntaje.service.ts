import { AuthService } from './../auth/auth-firebase.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Fecha } from 'src/app/clases/fecha';

@Injectable({
  providedIn: 'root'
})
export class PuntajeService {

  public puntajesRef: AngularFireList<any>;
  public puntajeRef: AngularFireObject<any>;
  public userData: any;

  constructor(
    private db: AngularFireDatabase
  ) {
    this.puntajesRef = this.db.list('/puntajes');
  }

  public registrarPuntaje(juego: string, correo: string, puntos: number){
    let fecha = new Fecha();
    console.log({game: juego, ts: fecha.date, user: correo, score: puntos})
    this.puntajesRef.push({game: juego, ts: fecha.date, user: correo, score: puntos});
  }

}
