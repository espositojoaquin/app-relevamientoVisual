import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private db: AngularFireAuth,private  router:Router) { }

  login(email: string, password: string){

    return new Promise ((resolve, rejects) => {
      this.db.signInWithEmailAndPassword(email, password).then(user => {
        resolve(user);
      }).catch(err => rejects(err));
    });
  }

  public logOut(){
    return new Promise ((resolve, rejects) => {
      this.db.signOut().then(user => {
        resolve(user);
      }).catch(err => rejects(err));
    });
  }

  logout() {
    this.db.signOut().then(() => {
      this.router.navigate(['/login']);
    })
  }

}
