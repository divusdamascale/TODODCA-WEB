import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Listtoadd } from '../models/listtoadd';
import { Observable } from 'rxjs';
import { List } from '../models/list';
import { map } from 'rxjs/operators';
import { Task } from '../models/task';
import { TaskToAdd } from '../models/tasktoadd';
import { state } from '@angular/animations';
import { TaskToUpdate } from '../models/tasktoupdate';
import { TagToAdd } from '../models/tagtoadd';
import { Tag } from '../models/tag';


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

  //get all task
  getTaskByListId(listId: number, jwtToken: string): Observable<Task[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwtToken}`
    });
  
    return this.http.get(`${this.baseUrl}/task/GetTaskByListId/${listId}`, { headers }).pipe(
      map(response => response as Task[])
    );
  }
  async createTask(task: TaskToAdd, jwtToken: string): Promise<Task> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwtToken}`
    });

    const response = await this.http.post<Task>(`${this.baseUrl}/task/createtask`, task, { headers }).toPromise();
    return response;
  }
  deleteTask(taskId: number,jwtToken:string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwtToken}`
    });
    return this.http.delete(`${this.baseUrl}/task/deleteTask/${taskId}`,{headers});

  }
  
  // updateTask(id:number, taskName:string, endDate:Date, jwtToken:string){
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${jwtToken}`
  //   });
  //   const taskToUpdate = {
  //     taskName: taskName,
  //     endDate: endDate
  //   };

  //   return this.http.put(`${this.baseUrl}/task/UpdateTask/${id}`, taskToUpdate);
  // }


  ChangeState(id: number, state: boolean, jwtToken: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwtToken}`
    });
  
    return this.http.put(`${this.baseUrl}/task/ChangeState/${id}?state=${state}`, {}, { headers });
  }



  async createTag(Tag: TagToAdd, jwtToken: string): Promise<Tag> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwtToken}`
    });

    const response = await this.http.post<Tag>(`${this.baseUrl}/tag/CreateTag`, Tag, { headers }).toPromise();
    return response;
  }
  getTagByUserId(userId: number, jwtToken: string): Observable<Tag[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwtToken}`
    });

    return this.http.get(`${this.baseUrl}/tag/getByUserId/${userId}`, { headers }).pipe(
      map(response => response as Tag[])
    );
  }
}
