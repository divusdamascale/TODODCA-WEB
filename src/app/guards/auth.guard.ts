import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log("authguard is called!");
    if (!this.authService.isLogged()) {
      // // Utilizatorul este autentificat, redirecționează către pagina de home
      
      return true;
      
    
    }
    
    // Utilizatorul nu este autentificat, permite accesul
    this.router.navigate(['/home']);
    return false;
  }
}