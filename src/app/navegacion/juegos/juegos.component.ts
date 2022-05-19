import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.scss']
})
export class JuegosComponent implements OnInit {

  tituloPage = 'Listado de juegos';

  constructor(public router: Router,) { }

  ngOnInit(): void {
  }

}
