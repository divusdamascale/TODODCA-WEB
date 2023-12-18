import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Listtoadd } from '../models/listtoadd';
import { Observable } from 'rxjs';
import { List } from '../models/list';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiHttpService {
  private baseUrl = 'https://localhost:7293'

  constructor(private http :HttpClient) { }

  //get all lists
  getLists(userId: number, jwtToken: string): Observable<List[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwtToken}`
    });

    return this.http.get(`${this.baseUrl}/list/getByUserId/${userId}`, { headers }).pipe(
      map(response => response as List[])
    );
  }

  async createList(list: Listtoadd, jwtToken: string): Promise<List> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwtToken}`
    });

    const response = await this.http.post<List>(`${this.baseUrl}/list/createlist`, list, { headers }).toPromise();
    return response;
  }
  
  
  //delete a list
  deleteList(listId: number,jwtToken:string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwtToken}`
    });
    return this.http.delete(`${this.baseUrl}/list/deleteList/${listId}`,{headers});
  }

}
