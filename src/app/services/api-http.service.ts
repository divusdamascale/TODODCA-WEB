import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiHttpService {
  private baseUrl = 'https://localhost:7293'

  constructor(private http :HttpClient) { }

  getLists(userId: number,jwtToken:string) {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwtToken}`
    });

    return this.http.get(`${this.baseUrl}/list/getByUserId/${userId}`,{headers});
  }
}
