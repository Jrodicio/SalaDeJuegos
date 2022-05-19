import { PuntajeService } from './../../../providers/puntaje/puntaje.service';
import { Component, OnInit } from '@angular/core';
import { ImgPreguntasService } from '../../../providers/img-preguntas/img-preguntas.service';
import { Preguntas } from '../../../clases/Preguntas';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.scss']
})
export class PreguntadosComponent implements OnInit {

  public tituloPage = 'Preguntados';

  public correoJugador: string;

  public juegoIniciado = false;
  public nivelSuperado = false;
  public nivelPerdido = false;
  public botonesDeshabilitados = true;
  public mostrarSpinner = false;

  public puntaje = 0;
  public nivel = 0;

  public preguntaImg: string;
  public preguntaStr: string;
  public respuestas: {respuesta: string, clase: string}[] = [{respuesta: '', clase: ''},{respuesta: '', clase: ''},{respuesta: '', clase: ''},{respuesta: '', clase: ''}]
  private idRespuestaCorrecta: number

  constructor(private puntajeService: PuntajeService, private imgPreguntasService:ImgPreguntasService) { }

  ngOnInit(): void {
    this.correoJugador = JSON.parse(localStorage.getItem('user')!).email;
  }

  public iniciarJuego(){
    this.puntaje = 0;
    this.nivel = 0;
    this.nuevoNivel();
    this.juegoIniciado = true;
    this.nivelPerdido = false;
    this.nivelSuperado = false;

    console.log("Juego iniciado");
  }

  //Al asignar un nuevo nivel, mostramos spinner de carga, obtenemos palabra y reseteamos a 0 las fallas del nivel actual y ocultamos spinner al finalizar.
  public nuevoNivel(){
    this.mostrarSpinner = true;

    this.SiguientePregunta();
    this.nivel++;
    this.botonesDeshabilitados = false;
    this.nivelSuperado = false;
    this.mostrarSpinner = false;
  }



  public SiguientePregunta(){
    let preguntas: Preguntas[] = Preguntas.GenerarPreguntas();
    this.preguntaStr = preguntas[this.nivel].pregunta;
    this.obtenerImagen(preguntas[this.nivel].idImagen);

    for(let i = 0; i<4; i++){
      this.respuestas[i].respuesta = preguntas[this.nivel].respuestas[i];
      this.respuestas[i].clase = 'btn-light'
    }

    this.idRespuestaCorrecta = preguntas[this.nivel].indexRespuesta;

  }

  public obtenerImagen(idImagen: number){
    return this.imgPreguntasService.ObtenerFoto(idImagen)
    .subscribe(
      foto => {
        this.preguntaImg = JSON.parse(JSON.stringify(foto)).src.original;
      }
    )
  }

  public Responder(idRespuesta: number){
    if (idRespuesta !== this.idRespuestaCorrecta){
      this.respuestas[idRespuesta].clase = 'btn-danger';
      this.gameOver();
    }
    else{
      this.SumarPuntaje();
      this.nivelSuperado = true;
    }

    this.botonesDeshabilitados = true;
    this.respuestas[this.idRespuestaCorrecta].clase = 'btn-success';
  }

    public gameOver(){
    //Subir puntaje;
    this.nivelPerdido = true;
    this.puntajeService.registrarPuntaje('Preguntados', this.correoJugador, this.puntaje);
  }

  private SumarPuntaje(){
    this.puntaje += this.nivel;
  }

}
