import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { List } from 'src/app/models/list';
import { Listtoadd } from 'src/app/models/listtoadd';
import { AuthService } from 'src/app/services/auth.service';
import { ListService } from 'src/app/services/listservice';
import { map } from 'rxjs/operators';
import { from } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ListComponent implements OnInit {

  userName: string;
  items: MenuItem[];
  listDialog: boolean = false;
  editDialog: boolean = false;
  lists!: List[];
  list!: List;
  selectedList!: List[] | null;
  submitted: boolean = false;
  statuses!: any[];
  newList: Listtoadd = {
    ListName: '',
    UserId: 0,
    Description: '',
    StartDate: new Date(),
  };

  constructor(
    private listService: ListService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private authService: AuthService
    
  ) {

  }
 
  async ngOnInit() {

    await this.loadLists()
    console.log(this.lists)

    this.userName = this.authService.getUserName();
    console.log(this.userName )

    this.items = [{
      label: this.userName + ' profile',
      items: [{
          label: 'Change Password',
          icon: 'pi pi-refresh',
          command: () => {
           
          }
      },
      {
          label: 'Delete Account',
          icon: 'pi pi-times',
          command: () => {
              
          }
      }
      ]},
      {
          label: '  ',
          items: [
          {
              label: 'Log out',
              icon: 'pi pi-upload',
              command: () => {
              this.signout();
              }
              
            
          }
      ]}
  ];
  
  
    
  }
  signout() {
    this.authService.deleteJwtToken();
    window.location.reload();
  }
  

  async loadLists() {
    from(this.listService.getLists())
      .pipe(
        map((data: List[]) => {
          this.lists = data;
          this.newList.UserId = this.authService.userId();
        })
      )
      .subscribe();
  }

  formatDate(date: any) {
    return date?.getDate() + '-' + (date?.getMonth() + 1) + '-' + date?.getFullYear();
  }

  showDialog() {
    // La deschiderea dialogului, resetează lista curentă și setează variabila pentru afișarea dialogului
    
    this.list = {};
    this.editDialog = false;
    this.submitted = false;
    this.listDialog = true;
    
  }

  hideDialog() {
    this.listDialog = false;
    this.editDialog = false;
    this.submitted = false;
    this.newList = {
        ListName: '',
        UserId: this.authService.userId(),
        Description: '',
        StartDate: new Date(),
    };
    
  }

  confirmDeleteSelected() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected lists?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // La confirmare, șterge listele selectate
        for (let i = 0; i < this.selectedList?.length; i++) {
          this.listService.deleteList(this.selectedList[i].listId).subscribe();
        }

        // Filtrază listele locale pentru a elimina cele șterse
        this.lists = this.lists.filter(val => !this.selectedList?.includes(val));
        this.selectedList = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Lists Deleted', life: 3000 });
      }
    });
  }
filterGlobal(event: any, filterValue: string) {
  // Implement global filtering logic here
  // For example, filter the 'lists' array based on the 'ListName' property
  const filteredLists = this.lists.filter(list => list.listName.toLowerCase().includes(filterValue.toLowerCase()));
  if (filterValue === '') {
    this.loadLists();
  } else if (filteredLists.length === 0) {
    this.loadLists();
  } else {
    this.lists = filteredLists;
  }
}
  confirmDelete(list: List) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + list.listName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // La confirmare, șterge lista
        this.listService.deleteList(list.listId).subscribe();
        // Filtrază lista locală pentru a elimina lista ștearsă
        this.lists = this.lists.filter(val => val.listId !== list.listId);
        this.list = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'List Deleted', life: 3000 });
      }
    });
  }
  addList() {
    if (!this.newList.ListName || !this.newList.Description) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Trebuie să completezi Titlul și descrierea!' });
      return;
    }

    this.listService.createList(this.newList).then(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'List added successfully!' });

        this.hideDialog();

        // Creează o copie a noii liste, respectând diferența de nume a proprietăților
        const newListCopy: List = {
          listName: this.newList.ListName,
          startDate: this.newList.StartDate,
          description: this.newList.Description
        };
        
        // Adaugă copia în array-ul lists
        this.lists = [...this.lists, newListCopy];

        this.newList = {
          ListName: '',
          UserId: this.authService.userId(),
          Description: '',
          StartDate: new Date(),
        };
        
        this.list = undefined;

        // Actualizează lista de liste
        this.loadLists();
      },
      (error: any) => {
        console.error('Error while adding list:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add list.' });
      }
    );
  }
    

  showEditDialog(list: List) {
    // Copiază valorile listei în newList pentru editare
    this.newList = Object.assign({}, list, {
      ListName: list.listName,
      UserId: 0,
      Description: list.description,
      StartDate: list.startDate
  });
  console.log('After showEditDialog:', this.newList);

  this.editDialog = true;
  this.listDialog = false;
}


  
}
