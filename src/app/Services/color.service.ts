import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor() { }
  // Behvoiur Subjects To Know The Color Vlaue and Stae
  private colorSubject = new BehaviorSubject<string>('#f0f3f7');
  currentColor$ = this.colorSubject.asObservable();

  private colorPickerState = new BehaviorSubject<boolean>(false);
  colorPickerState$ = this.colorPickerState.asObservable();


  // Method To Update The Color
  changeColor(color: string) {
    console.log(color);
    
    this.colorSubject.next(color);
  }

  // Method to change Color 
  toggleColorPicker() {
    this.colorPickerState.next(!this.colorPickerState.value);
  }
}
