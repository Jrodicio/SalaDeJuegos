import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public loginsRef: AngularFireList<any>;
  public userData: any;

  constructor(
    public angularFireAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) {
    this.loginsRef = db.list('/loginUsuarios');
    this.angularFireAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  createUser(value:any) {
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.createUserWithEmailAndPassword(value.correo, value.contrasena)
        .then(
          res => resolve(res),
          err => reject(err));
    });
  }

  signinUser(value:any) {
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.signInWithEmailAndPassword(value.correo, value.contrasena)
        .then(
          res => resolve(res),
          err => reject(err));
    });
  }

  signoutUser() {
    return new Promise<void>((resolve, reject) => {
      if (this.angularFireAuth.currentUser !== null) {
        this.angularFireAuth.signOut()
          .then(() => {
            resolve();
          }).catch(() => {
            reject();
          });
      }
    });
  }

  userDetails() {
    return this.angularFireAuth.user;
  }

  addLoginDB(email: string){
    let ts = new Date();
    console.log({fecha: ts.toString(), usuario:email})
    this.loginsRef.push({fecha: ts.toString(), usuario:email});
  }
}

