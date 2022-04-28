import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../providers/auth/auth-firebase.service';
import { Router } from '@angular/router';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public loginInvalido: boolean = false;
  public errorLogin: string = '';
  public ocultarSpinner: boolean = true;

  constructor(
    private authService:AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
      this.loginForm = this.formBuilder.group({
        correo: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        ])),
        contrasena: new FormControl('', Validators.compose([
          Validators.minLength(6),
          Validators.required
        ])),
      });
   }

  ngOnInit() {

  }

  signIn(value:any) {
    this.ocultarSpinner = false;
    this.authService.signinUser(value)
      .then((response) => {
        this.authService.addLoginDB(this.loginForm.controls.correo.value);
        this.loginForm.controls.correo.setValue('');
        this.loginForm.controls.contrasena.setValue('');
        this.ocultarSpinner = true;
        this.router.navigateByUrl('home');
      }, error => {
        this.ocultarSpinner = true;
        if(error.code === 'auth/user-not-found')
        {
          this.errorLogin = 'Verifique sus credenciales y vuelva a probar.';
        }
        else if(error.code === 'auth/wrong-password')
        {
          this.errorLogin = 'Combinación de correo y clave incorrecta.';
        }
        else if(error.code === 'auth/too-many-requests')
        {
          this.errorLogin = 'Demasiados intentos. Vuelva a probar en unos minutos.';
        }
        else
        {
          this.errorLogin = 'Ha ocurrido un error! Vuelva a probar en unos instantes.';
        }
      });
  }

  get fm(){
    return this.loginForm.controls;
  }

  cargarCredencialesAdmin(){
    this.loginForm.controls.correo.setValue('administrador@correo.com');
    this.loginForm.controls.contrasena.setValue('administrador');
  }
}
