import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Swal from 'sweetalert2';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  // Properties
  signInForm!: FormGroup;
  hide:boolean =true

  constructor(private fb: FormBuilder, public authService: AuthService) {}

  ngOnInit() {
    // Form
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Method To SIgn In
  onSubmit() {
    if(localStorage.getItem('userToken')){
      Swal.fire('You Already Loged In')
    }else{
      if (this.signInForm.valid) {
        const modal = {
          email : this.signInForm.value.email,
          password : this.signInForm.value.password
        }
  
        this.authService.signIn(modal.email, modal.password).then(() => {
          this.authService.toggleLogedState()
        })
        .catch((error) => {
          console.error(error);
        });
      }
    }

  }

  //Methods To Hndle Input Errors
  EmailErrorNessage(){
    if (this.signInForm.controls['email'].hasError('required') ) {
      return  'Your Email is Required';
    }else if (this.signInForm.controls['email'].hasError('email')){
      return 'Please Enter a Valid Email' 
    }else{
      return '';
    }
  }
  PasswordErrorNessage(){
    if (this.signInForm.controls['password'].hasError('required') ) {
      return  'Your Password is Required';
    }else if (this.signInForm.controls['password'].hasError('minlength')){
      return 'Password Min Length is 6' 
    }else{
      return '';
    }
  }
}
