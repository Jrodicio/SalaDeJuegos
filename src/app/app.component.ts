import { Component, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Sala de juegos';
  @Output() previousPage = '';
  @Output() actualPage = '';
  @Output() nextPage = '';
}
