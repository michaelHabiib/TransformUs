import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColorPickerComponent } from '../color-picker/color-picker.component';
import { ColorService } from 'src/app/Services/color.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  //Properties
  isOpen : boolean = false
  isLoged : boolean = false

  constructor(private dialog : MatDialog,private  _ColorService : ColorService, private AuthService : AuthService){}
  
  ngOnInit(): void {
    // Method To Subscribe On Loged State to know if The User Is loged Or not
    this.AuthService.LogedState$.subscribe((state :boolean) => {
      this.isLoged = state;
    });
  }

  // Method to open Color Picker Dialog but now it is not open as a Dialog
  openColorPicker(){
    this.dialog.open(ColorPickerComponent)
  }

  // Method to open Color Picker
  toggleColorPicker() {
    this.isOpen = !this.isOpen
    this._ColorService.toggleColorPicker();
  }
  // Method To SIgn Out
  signOut(){
    this.AuthService.signOut().then(() => {
      localStorage.removeItem('userToken')
      this.AuthService.toggleLogedState()
    })
  }
}
