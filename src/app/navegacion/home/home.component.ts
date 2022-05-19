import { Router } from '@angular/router';
import { AuthService } from '../../providers/auth/auth-firebase.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  tituloPage: string;
  userMail: string;
  constructor(
    public authService: AuthService,
    public router: Router,
    ) {
    }

  ngOnInit(): void {
    this.userMail = JSON.parse(localStorage.getItem('user')!).email;
  }

  onTituloPage(pageComponent: any){
    this.tituloPage = pageComponent.tituloPage;
  }

  desloguear(){
    this.authService.signoutUser()
    .then((response) => {
      this.router.navigate(['/']);
    });
  }

  rutearOculto(destino: string){
    this.router.navigate(["../"+destino]/*, {skipLocationChange: true}*/);
  }

  rutearJuego(destino: string){
    this.router.navigateByUrl('home/juegos/'+destino);
  }
}
