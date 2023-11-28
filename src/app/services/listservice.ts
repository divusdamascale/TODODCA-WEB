import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ApiHttpService } from './api-http.service';
import { Observable, map } from 'rxjs';
import { List } from '../models/list';
import { Listtoadd } from '../models/listtoadd';
// import { UserService } from './user.service';
    
@Injectable()
export class ListService {
    /**
     *
     */
    constructor(private jwt:AuthService,private api:ApiHttpService) {
        
    }
    
    getLists() :Observable<List[]>{

        return this.api.getLists(this.jwt.userId(), this.jwt.getJwtToken()).pipe(
            map((response: any) => {
              return response.map((item: any) => ({
                listId: item.listId,
                listName: item.listName,
                startDate: new Date(item.startDate), 
                description: item.description
              }));
            })
          );

    }

    createList(list: Listtoadd) {
        return this.api.createList(list, this.jwt.getJwtToken());
    }

    deleteList(listId: number) {
        return this.api.deleteList(listId, this.jwt.getJwtToken());
    }

};