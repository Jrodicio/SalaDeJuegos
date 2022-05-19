import { Component, Input, OnInit } from '@angular/core';
import { PalabrasApiService } from 'src/app/providers/palabras/palabras-api.service';
import { PuntajeService } from '../../../providers/puntaje/puntaje.service';


@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.scss']
})
export class AhorcadoComponent implements OnInit {

  public tituloPage = 'Ahorcado';

  public correoJugador: string;

  public juegoIniciado = false;
  public palabra: string[] = [];
  public palabraAdivinada: string[] = [];
  public mostrarSpinner = false;
  public nivel = 0;
  public cantFallas = 0;
  public puntaje = 0;

  public nivelSuperado = false;

  constructor(private palabrasApi: PalabrasApiService, private puntajeService: PuntajeService) { }

  ngOnInit(): void {
    this.correoJugador = JSON.parse(localStorage.getItem('user')!).email;
  }

  //Iniciamos juego, seteamos nivel y puntaje en 0, pasamos al nuevo nivel y marcamos flag juegoIniciado.
  public iniciarJuego(){
    this.puntaje = 0;
    this.nivel = 0;
    this.nuevoNivel();
    this.juegoIniciado = true;
    console.log("Juego iniciado");
  }

  //Al asignar un nuevo nivel, mostramos spinner de carga, obtenemos palabra y reseteamos a 0 las fallas del nivel actual y ocultamos spinner al finalizar.
  public nuevoNivel(){
    this.mostrarSpinner = true;
    this.palabraAdivinada = [];
    this.obtenerPalabra().add(()=>{
      this.nivelSuperado = false;
      this.nivel++;
      this.cantFallas = 0;
      while(this.palabraAdivinada.length < this.palabra.length){
        this.palabraAdivinada.push('_');
      }

      this.mostrarSpinner = false;
    });
  }

  //Obtenemos una nueva desde el servicio palabrasApi, nivel+4 indica que la palabra tendría que tener 4 letras más que el nivel. Limpiamos formato de la palabra obtenida.
  public obtenerPalabra(){
    return this.palabrasApi.obtenerPalabra(this.nivel+4)
    .subscribe(
      palabra => {
        this.palabra = palabra[0].toUpperCase().replace('Á','A').replace('É','E').replace('Í','I').replace('Ó','O').replace('Ú','U').replace('Ü','U').split('');
        console.log('palabra obtenida:', this.palabra);
      }
    )
  }

  //Buscamos la letra del parametro dentro de la palabra actual del juego y tomamos acciones acordes a la lógica del juego.
  public buscarLetra(letra: string){

    if(this.palabra.includes(letra)){
      for(let i = 0; i<this.palabra.length; i++){
        if(this.palabra[i] == letra){
          this.palabraAdivinada[i] = letra;
        }
      }
      //Pasar de nivel
      if (this.palabra.toString() == this.palabraAdivinada.toString()){
        //Calculamos puntaje acorde al nivel y la cantidad de fallas obtenidas.
        this.puntaje += this.nivel * 10 - this.cantFallas;
        //Mostramos mensaje de nivel superado y botón siguiente.
        this.nivelSuperado = true;
      }
    }
    else{
      this.cantFallas++;
      if(this.cantFallas == 10){
        this.gameOver();
      }
    }
  }

  public gameOver(){
    //Subir puntaje;
    this.palabraAdivinada = this.palabra;
    this.puntajeService.registrarPuntaje('Ahorcado', this.correoJugador, this.puntaje);
    this.juegoIniciado = false;
  }

  public finalizarJuego(){
    this.gameOver();
    this.nivel = 0;
    this.palabra = [];
    this.palabraAdivinada = [];
    this.cantFallas = 0;
    this.juegoIniciado = false;

    console.log('Juego finalizado');
  }



}
