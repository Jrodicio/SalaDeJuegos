import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Mensaje } from 'src/app/clases/Mensaje';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public chat: Observable<any[]>;
  public mensajesRef: AngularFireList<Mensaje>;
  public mensajeRef: AngularFireObject<Mensaje>;
  public userData: any;

  private dbPath = '/chat';

  constructor(
    private db: AngularFireDatabase
  ) {
    this.mensajesRef = this.db.list(this.dbPath);
    this.chat = this.db.list(this.dbPath).valueChanges();
  }

  public enviarMensaje(mensaje: Mensaje){
    const chatRef = this.db.list(this.dbPath);
    chatRef.push(mensaje);
  }

  public leerMensajes(){
    return this.mensajesRef;
  }
}
