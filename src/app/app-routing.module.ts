import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './Components/body/body.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { MasterPageComponent } from './Components/master-page/master-page.component';
import { AuthGuard } from './gaurd/auth.guard';

const routes: Routes = [
  
  {path : 'home', component:MasterPageComponent,
  children : [
    {path : '', redirectTo : 'Tasks', pathMatch:'full'},
    {path : 'login', component:SignInComponent},
    {path : 'register', component:SignUpComponent},
    {path : 'Tasks', component:BodyComponent, canActivate: [AuthGuard],},
    ]
  },
  {path : '', redirectTo : 'home', pathMatch : 'full'}
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
