import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://localhost:7293'
  isAuthenticate = false;


  constructor(private http:HttpClient,private cookie:CookieService) { }
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

  isAuthenticated()
  {
    return this.isAuthenticate
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
