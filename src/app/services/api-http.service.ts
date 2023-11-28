import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Listtoadd } from '../models/listtoadd';


@Injectable({
  providedIn: 'root'
})
export class ApiHttpService {
  private baseUrl = 'https://localhost:7293'

  constructor(private http :HttpClient) { }

  //get all lists
  getLists(userId: number,jwtToken:string) {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwtToken}`
    });

    return this.http.get(`${this.baseUrl}/list/getByUserId/${userId}`,{headers});
  }

  // create a new list
  createList(list: Listtoadd,jwtToken:string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwtToken}`
    });
    return this.http.post(`${this.baseUrl}/list/create`, list,{headers});
  }
  
  //delete a list
  deleteList(listId: number,jwtToken:string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwtToken}`
    });
    return this.http.delete(`${this.baseUrl}/list/delete/${listId}`,{headers});
  }

}
