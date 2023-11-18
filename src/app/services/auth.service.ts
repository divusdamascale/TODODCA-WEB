import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Token } from '@angular/compiler';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://localhost:7293'
  isAuthenticate = false;


  constructor(private http:HttpClient,private cookie:CookieService, private router: Router) { }
  login(loginData: any) {
    return this.http.post(`${this.baseUrl}/auth/login`, loginData);
  }

  register(registerData: any) {
    return this.http.post(`${this.baseUrl}/auth/register`, registerData);
  }

  setIsAuthenticated(value:boolean)
  {
    this.isAuthenticate=value;
  }

  isAuthenticated(): boolean
  {
    const token = this.cookie.get('jwtToken');

    if(token)
    {
      const decodeToken = this.decodeToken(token);
      const currentTimeStamp= Math.floor(new Date().getTime() / 1000);
      if(decodeToken && decodeToken.exp && decodeToken.exp > currentTimeStamp)
      {
  
        return true;
      }

    }
    this.router.navigate(['/login']);
    return false;
  }
  private decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      console.error('Eroare la decodificarea token-ului:', error);
      return null;
    }
  }
  saveJwtToken(token: string) {
    this.cookie.set('jwtToken', token);

  }

  getJwtToken(): string | undefined {
    return this.cookie.get('jwtToken');
  }

  deleteJwtToken() {
    this.cookie.delete('jwtToken');
  }
}
