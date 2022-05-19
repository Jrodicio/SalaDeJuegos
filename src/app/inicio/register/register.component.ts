import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../providers/auth/auth-firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  public registerInvalido: boolean = false;
  public errorRegister: string = '';
  public ocultarSpinner: boolean = true;

  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder,
    public router: Router
  ) {
    this.registerForm = this.formBuilder.group({
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

  ngOnInit(): void {
  }

  signUp(value: any) {
    this.ocultarSpinner = false;
    this.authService.createUser(value)
      .then((response) => {
        this.errorRegister = "";
        this.registerForm.controls.correo.setValue('');
        this.registerForm.controls.contrasena.setValue('');
        this.ocultarSpinner = true;
        this.router.navigateByUrl('home');
      }, error => {
        this.ocultarSpinner = true;
        if (error.code == 'auth/email-already-in-use'){
          this.errorRegister = 'El correo ya se encuentra registrado.';
        }
        else{
          this.errorRegister = 'No se ha podido registrar al usuario.';
        }

      });
  }

  get fm(){
    return this.registerForm.controls;
  }

  routeLogin(){
    this.router.navigate(['inicio'], {skipLocationChange: true});
  }
}
