import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule} from '@angular/fire/compat'
import { environment } from 'src/environments/environment';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { BodyComponent } from './Components/body/body.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatDialogModule} from '@angular/material/dialog';
import { NewTaskComponent } from './Components/new-task/new-task.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { TaskComponent } from './Components/task/task.component';
import { UpdateTaskComponent } from './Components/update-task/update-task.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms'; 
import {MatSelectModule} from '@angular/material/select';
import {MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatSliderModule} from '@angular/material/slider';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { ProfileComponent } from './Components/profile/profile.component';
import {MatCardModule} from '@angular/material/card';
import { MasterPageComponent } from './Components/master-page/master-page.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ColorPickerComponent } from './Components/color-picker/color-picker.component';
import { FormsModule } from '@angular/forms';
import { NotifctionsComponent } from './Components/notifctions/notifctions.component';
const environmenttt : any = {
  production : false,
  firebaseConfig : {
    apiKey: "AIzaSyB3fLbWEXcfiV6yJiEIc3ys_OfsBTqxFtU",
    authDomain: "kanban-bb042.firebaseapp.com",
    projectId: "kanban-bb042",
    storageBucket: "kanban-bb042.appspot.com",
    messagingSenderId: "139345613784",
    appId: "1:139345613784:web:d96e88ef55267041e518ad"
    }
}
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    BodyComponent,
    NewTaskComponent,
    TaskComponent,
    UpdateTaskComponent,
    SignUpComponent,
    SignInComponent,
    ProfileComponent,
    MasterPageComponent,
    ColorPickerComponent,
    NotifctionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environmenttt.firebaseConfig),
    AngularFireAuthModule,
    DragDropModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatNativeDateModule,
    MatInputModule,
    MatSliderModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
