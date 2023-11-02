import { Injectable } from '@angular/core';
    
@Injectable()
export class ListService {
    getListsData() {
        return [
            {
                id: '1000',
                code: 'f230fh0g3',
                name: 'Bamboo Watch',
                description: 'List Description',
                inventoryStatus: 'no-status'
            },
          
        ];
    }

    getListsMini() {
        return Promise.resolve(this.getListsData().slice(0, 5));
    }

    getListsSmall() {
        return Promise.resolve(this.getListsData().slice(0, 10));
    }

    getLists() {
        return Promise.resolve(this.getListsData());
    }

};