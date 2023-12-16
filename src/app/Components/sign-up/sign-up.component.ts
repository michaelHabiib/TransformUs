import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
    // Properties

  signupForm!: FormGroup;
  hide = true

  constructor(private fb: FormBuilder, public authService: AuthService) {}

  ngOnInit() {
        // Form
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      Name: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  // Method th Handle Sign Up Process
  onSubmit() {
    if (this.signupForm.valid) {
      const modal = {
        email : this.signupForm.value.email,
        password : this.signupForm.value.password,
        displayName :  this.signupForm.value.Name
      }
      this.authService.signUp(modal.email, modal.password, modal.displayName)
    }
  }

  // Methods To Hndle Input Errors
  EmailErrorNessage(){
    if (this.signupForm.controls['email'].hasError('required') ) {
      return  'Your Email is Required';
    }else if (this.signupForm.controls['email'].hasError('email')){
      return 'Please Enter a Valid Email' 
    }else{
      return '';
    }
  }
  PasswordErrorNessage(){
    if (this.signupForm.controls['password'].hasError('required') ) {
      return  'Your Password is Required';
    }else if (this.signupForm.controls['password'].hasError('minlength')){
      return 'Password Min Length is 6' 
    }else{
      return '';
    }
  }
  NameErrorNessage(){
    if (this.signupForm.controls['Name'].hasError('required') ) {
      return  'Your Name is Required';
    }else if (this.signupForm.controls['Name'].hasError('minlength')){
      return 'Name Min Length is 6' 
    }else{
      return '';
    }
  }

}
