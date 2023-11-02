import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { List } from 'D:/proiect ciuca/todo/src/app/interfaces/list';
import { ListService } from 'D:/proiect ciuca/todo/src/app/services/listservice';

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
        this.listService.getLists().then((data) => (this.lists = data));

        this.statuses = [
            { label: 'Lejer', value: 'lejer' },
            { label: 'Moderat', value: 'moderat' },
            { label: 'Urgent', value: 'urgent' }
        ];
    }

    openNew() {
        this.list = {};
        this.submitted = false;
        this.listDialog = true;
    }

    deleteSelectedLists() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected lists?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.lists = this.lists.filter((val) => !this.selectedList?.includes(val));
                this.selectedList = null;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Lists Deleted', life: 3000 });
            }
        });
    }

    editList(list: List) {
        this.list = { ...list };
        this.listDialog = true;
    }

    deleteList(list: List) {
            this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + list.name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.lists = this.lists.filter((val) => val.id !== list.id);
                this.list = {};
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'List Deleted', life: 3000 });
            }
        });
    }

    hideDialog() {
        this.listDialog = false;
        this.submitted = false;
    }

    saveList() {
        this.submitted = true;

        if (this.list.name?.trim()) {
            if (this.list.id) {
                this.lists[this.findIndexById(this.list.id)] = this.list;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'List Updated', life: 3000 });
            } else {
                this.list.id = this.createId();
                this.lists.push(this.list);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'List Created', life: 3000 });
            }

            this.lists = [...this.lists];
            this.listDialog = false;
            this.list = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.lists.length; i++) {
            if (this.lists[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    getSeverity(status: string) {
        switch (status) {
            case 'lejer':
                return 'success';
            case 'moderat':
                return 'warning';
            case 'urgent':
                return 'danger';
            default: return null;
        }
    }
}
