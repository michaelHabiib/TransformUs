import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import * as jwt_decode from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth = getAuth();

  // BehaviorSubject To kNow Then user Is Loged
  private LogedState = new BehaviorSubject<boolean>(false);
  LogedState$ = this.LogedState.asObservable();

  constructor(public afAuth: AngularFireAuth,private router : Router,
    private afs: AngularFirestore) {}

  // Method update the observable To kNow Then user Is Loged
    toggleLogedState() {
      this.LogedState.next(!this.LogedState.value);
    }
    
    // Method To Sign Up 
    async signUp(email: string, password: string, displayName : string) {
      await this.afAuth.createUserWithEmailAndPassword(email, password).then((result) => {
        result.user?.updateProfile({displayName :displayName })
        this.router.navigate(['home/login'])
      }), (error : any) => {
        this.fireAlret('Something went wrong!')
      }
    }

    // Method TO Sign In
    signIn(email: string, password: string) {
      return this.afAuth.signInWithEmailAndPassword(email, password).then((result) => {
        return result.user?.getIdToken();
      }).then((idToken) => {
        localStorage.setItem('userToken', JSON.stringify(idToken) );
        this.router.navigate(['home']);
      }).catch((err) => {
        this.fireAlret('Invalid Email or Password!');
      });
  }
  
    // Method To Sign Out
    signOut() {
      return this.afAuth.signOut();
    }
    
    // Method To Firw ALret With Customize Message
    fireAlret(message : string){
      Swal.fire({
        icon: "error",
        title: message,
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
      });
    }
}
