import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ApiHttpService } from './api-http.service';
import { Observable, map } from 'rxjs';
import { List } from '../models/list';
import { TaskToAdd } from '../models/tasktoadd';
import { Task } from '../models/task';
import { TaskToUpdate } from '../models/tasktoupdate';
import { TagToAdd } from '../models/tagtoadd';
import { Tag } from '../models/tag';
// import { UserService } from './user.service';
    
@Injectable()
export class TaskService {
   
    constructor(private jwt:AuthService,private api:ApiHttpService) {
        
    }
    
    async getTask(listId: number): Promise<Task[]> {
      try {
        const response: any = await this.api.getTaskByListId(listId, this.jwt.getJwtToken()).toPromise();
        return response.map((item: any) => ({
          taskId: item.taskId,
          taskName: item.taskName,
          endDate: new Date(item.endDate),
          state: item.state,
        }));
      } catch (error) {
        throw error;
      }
    }

    createTask(task: TaskToAdd) {
        return this.api.createTask(task, this.jwt.getJwtToken());
    }

    deleteTask(taskId: number) {
        return this.api.deleteTask(taskId, this.jwt.getJwtToken());
    }
    changeState(taskId: number, newstate:boolean): Observable<any> {
      return this.api.ChangeState(taskId, newstate, this.jwt.getJwtToken());
    }
    reopenTask(taskId: number, newstate:boolean): Observable<any> {
      return this.api.ChangeState(taskId, newstate, this.jwt.getJwtToken());
    }
   

    
    createTag(Tag: TagToAdd) {
      return this.api.createTag(Tag, this.jwt.getJwtToken());
  }

  async getTagByUserId(UserId: number): Promise<Tag[]> {
    try {
      const response: any = await this.api.getTagByUserId(UserId, this.jwt.getJwtToken()).toPromise();
      return response.map((item: any) => ({
        TagId: item.tagId,
        UserId: item.userId,
        TagName: item.tagName,
      }));
    } catch (error) {
      throw error;
    }
  }
   

};
