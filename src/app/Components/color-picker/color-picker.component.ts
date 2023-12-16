import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ColorService } from 'src/app/Services/color.service';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translateY(0)',
        opacity: 1
      })),
      state('out', style({
        transform: 'translateY(-100%)',
        opacity: 0
      })),
      transition('in => out', animate('300ms ease-out')),
      transition('out => in', animate('300ms ease-in'))
    ])
  ]
})

export class ColorPickerComponent implements OnInit {
  //Properties
  selectedColor: string = '#f0f3f7';
  isOpen = false;

  constructor(private _colorService: ColorService) {}

  ngOnInit(): void {
    // Subscrbtion on Color value 
    this._colorService.colorPickerState$.subscribe((state :boolean) => {
      this.isOpen = state;
    });
  }



  // Method to Change Color Value
  changeColor() {    
    this._colorService.changeColor(this.selectedColor);
  } 
    // Method to Change status of Color Component (open or not)
  toggleColorPicker() {
    this._colorService.toggleColorPicker();
  }
}
