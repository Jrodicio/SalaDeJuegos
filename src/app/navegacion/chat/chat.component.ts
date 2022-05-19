import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from '../../providers/chat/chat.service';
import { Mensaje } from '../../clases/Mensaje';
import { Fecha } from '../../clases/fecha';
import { map } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @Input()
    correoUsuario: string;

  mensajes?: Mensaje[];
  public chatCompleto: any;
  public chatAbierto = false;

  constructor( public chatService: ChatService ) { }

  ngOnInit(): void {
    this.getMensajes();
  }

  public enviarMensaje(contenido: string){
    if(contenido.length > 0){
      let mensajeNuevo = new Mensaje();

      mensajeNuevo.contenido = contenido;
      mensajeNuevo.correo = this.correoUsuario;
      const fecha = new Fecha();
      mensajeNuevo.ts = fecha.date;

      this.chatService.enviarMensaje(mensajeNuevo);
    }
  }

  public getMensajes(){
    this.chatService.leerMensajes().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.mensajes = data;
    });
  }

  public pruebaMensajes(){
    console.log(this.mensajes);
  }

  public abrirChat(){
    this.chatAbierto = true;
  }

  public cerrarChat(){
    this.chatAbierto = false;
  }
}
