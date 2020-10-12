import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  login(email: string, password: string){
    return new Promise ((resolve, rejects) => {
      firebase.auth().signInWithEmailAndPassword(email, password).then(user => {
        resolve(user);
      }).catch(err => rejects(err));
    });
  }

  public logOut(){
    return new Promise ((resolve, rejects) => {
      firebase.auth().signOut().then(user => {
        resolve(user);
        this.router.navigate(['/login']);
      }).catch(err => rejects(err));
    });
  }

  getCurrentUserId(): string {
    return firebase.auth().currentUser ? firebase.auth().currentUser.uid : null;
  }

  getCurrentUserMail(): string {
    return firebase.auth().currentUser.email;
  }
}


