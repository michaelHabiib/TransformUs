import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  // This Gaurd is Working but not assign to any toutes just for free exploriing
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Check if there is a token in local storage
    const token = localStorage.getItem('userToken');

    if (token) {
      return true; // User is logged in, allow access to the route
    } else {
      // User is not logged in, redirect to the login page
      this.router.navigate(['/home/login']);
      return false;
    }
  }
}
