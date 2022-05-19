import { Component, EventEmitter, OnInit , Output} from '@angular/core';
import { AuthService } from '../../providers/auth/auth-firebase.service';

@Component({
  selector: 'app-datos-jugador',
  templateUrl: './datos-jugador.component.html',
  styleUrls: ['./datos-jugador.component.scss']
})
export class DatosJugadorComponent implements OnInit {

  public tituloPage = 'Datos del jugador';

  constructor(
    public authService: AuthService
  ) {
  }

  ngOnInit(): void {
  }

}
