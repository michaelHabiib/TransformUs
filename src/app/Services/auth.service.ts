import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth) {}

    // Sign Up
    signUp(email: string, password: string) {
      return this.afAuth.createUserWithEmailAndPassword(email, password);
    }
  
    // Sign In
    signIn(email: string, password: string) {
      return this.afAuth.signInWithEmailAndPassword(email, password);
    }
  
    // Sign Out
    signOut() {
      return this.afAuth.signOut();
    }
  
    // Get User
    getUser() {
      return this.afAuth.user;
    }
}
