import { Component, Input, OnInit } from '@angular/core';
import * as jwt_decode from "jwt-decode";
import { AuthService } from 'src/app/Services/auth.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  //Properties
  @Input() email: string = '';
  userDataDecoded ! :any
  userData ! : any
  isLoged : boolean = false

  constructor(private authService : AuthService){}

  ngOnInit(): void {

    // Decoding The token
    this.userData = localStorage.getItem('userToken')
    if(this.userData){
      this.userDataDecoded = jwt_decode.jwtDecode(this.userData)
    }
    
    // Subscrbtion To Know If The User Is loged Or Not
    this.authService.LogedState$.subscribe((state :boolean) => {
      this.isLoged = state;
    });
    
  }



  
}
