import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  fakeLogin(){

    // let rnd:number = Math.floor(Math.random() * 11);
    // if(rnd%2 == 0){
    //   return 'home';
    // }
    // else{
    //   return 'error';
    // }
    return 'home'
  }

}
