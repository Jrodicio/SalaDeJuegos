import { Router } from '@angular/router';
import { AuthService } from './../providers/auth/auth-firebase.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router,
    ) {
      // if (this.authService.userData.email === undefined)
      // {
      //   this.router.navigateByUrl("/");
      // }
    }

  ngOnInit(): void {
  }

  desloguear(){
    this.authService.signoutUser();
    this.router.navigate(['/']);
  }
}
