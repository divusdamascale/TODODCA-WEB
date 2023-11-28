import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { List } from 'src/app/models/list';
import { ListService } from 'src/app/services/listservice';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ListComponent implements OnInit {
    
    listDialog: boolean = false;
    
    lists!: List[];
    
    list!: List;
    
    selectedList!: List[] | null;
    
    submitted: boolean = false;
    
    statuses!: any[];
    
    constructor(private listService: ListService, private messageService: MessageService, private confirmationService: ConfirmationService) {}
    
    ngOnInit() {
        this.listService.getLists().subscribe((data) => {
            this.lists = data;
        });
    }

    formatDate(date:any) {

        return date?.getDate() + '-' + (date?.getMonth()+1) + '-' + date?.getFullYear();
    }
    showDialog() {
        this.list = {};
        this.submitted = false;
        this.listDialog = true;
    }
    
    hideDialog() {
        this.listDialog = false;
        this.submitted = false;
    }
    
    confirmDeleteSelected() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected lists?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                for(let i=0;i<this.selectedList?.length;i++)
                {
                    this.listService.deleteList(this.selectedList[i].listId).subscribe();
                }

                this.lists = this.lists.filter(val => !this.selectedList?.includes(val));
                this.selectedList = null;
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Lists Deleted', life: 3000});
            }
        });
    }

    confirmDelete(list: List) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + list.listName + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.listService.deleteList(list.listId).subscribe();
                this.lists = this.lists.filter(val => val.listId !== list.listId);
                this.list = {};
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'List Deleted', life: 3000});
            }
        });
    }
    
}
