import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/taskservice';
import { Task } from 'src/app/models/task';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, Header, MenuItem, MessageService } from 'primeng/api';
import { from, map } from 'rxjs';
import { TaskToAdd } from 'src/app/models/tasktoadd';
import { state } from '@angular/animations';
import { TaskToUpdate } from 'src/app/models/tasktoupdate';
import { TagToAdd } from 'src/app/models/tagtoadd';
import { AuthService } from 'src/app/services/auth.service';
import { Tag } from 'src/app/models/tag';


@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.scss']
})
export class TasklistComponent implements OnInit {
  tasks: Task[] = [];
   currentDate: Date = new Date();
  addTaskDialog: boolean = false;
  addTagDialog: boolean = false;
  editTaskDialog: boolean = false;
  submitted: boolean = false;
  newTask: TaskToAdd = {
    TaskName: '',
    ListId: 0,
    EndDate: new Date(),  
  };
  listId:number;
  newTag: TagToAdd = {
    UserId: 0,
    TagName: '',
  };
  tagList: Tag[] = [];
  selectedTag: string | null = null;


  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  selectTag(tag: Tag) {
    this.selectedTag = tag.tagName;
    console.log(this.selectedTag);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.listId = +params['listId'];
      this.taskService.getTask(this.listId).then((data) => {
        this.tasks = data;
        this.loadTasks();
        
      
      });
    });
    this.loadTags(this.authService.userId());

    



  }

  async loadTasks() {
    from(this.taskService.getTask(this.listId))
      .pipe(
        map((data: Task[]) => {
          this.tasks = data;
          
        })
      )
      .subscribe();
  }
  async loadTags(userId: number) {
    try {
      this.tagList = await this.taskService.getTagByUserId(userId);
      console.log('TagList:', this.tagList);
    } catch (error) {
      console.error('Error loading tags:', error);
    }
  }


  selectedColor: string = ''; 

  colorOptions: { label: string, value: string }[] = [
    { label: 'Primary', value: 'primary' },
    { label: 'Warning', value: 'warning' },
    { label: 'Danger', value: 'danger' },
  ];

  selectColor(color: string) {
    this.selectedColor = color;
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  async addTask() {
    if (!this.newTask.TaskName || !this.newTask.EndDate) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Trebuie să completezi numele și data limită a task-ului!' });
      return;
    }

    
    if (this.newTask.EndDate < this.currentDate) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Data limită trebuie să fie mai mare decât data curentă!' });
      return;
    }

    try {
      this.newTask.ListId = this.listId;
      var addedTask: Task;
      from(this.taskService.createTask(this.newTask)).subscribe(
        (response: Task) => { // Save the response in addedTask
          addedTask = response;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task added successfully! '});
        
          this.tasks = [...this.tasks, addedTask];
          this.loadTasks();
          addedTask = {
            endDate: new Date(),
            listId: 0,
            taskId: 0,
            taskName: '',
            state: false
          };
          this.hideDialog();
        },
        (error: any) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add task.' });
        }
      );
    } catch {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add task.' });
    }
  }   
    
  deleteTask(task: Task) {
  
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + '<b>' + task.taskName + '?</b?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.taskService.deleteTask(task.taskId).subscribe();
        this.tasks = this.tasks.filter((val) => val.taskId !== task.taskId);
        console.log('List after deletion:', this.tasks);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'List Deleted', life: 3000 });
      }
    });
  }
  async changeState(task: Task) {
    try {
      await this.taskService.changeState(task.taskId, true).toPromise();
      
      
      this.tasks.forEach(item => {
        if (item.taskId === task.taskId) {
          item.state = true;
        }
        
      });
      this.loadTasks()
      
      this.messageService.add({
        severity: 'success',
        summary: 'Succes',
        detail: 'Taskul a fost inchis cu succes!',
        life: 3000
      });
  
      console.log('Starea sarcinii a fost actualizată în baza de date');
    } catch (error) {
      console.error('Eroare la actualizarea stării sarcinii:', error.message);
    }
  }
  
  async reopenTask(task: Task) {
    try {
      await this.taskService.changeState(task.taskId, false).toPromise();
      
      
      this.tasks.forEach(item => {
        if (item.taskId === task.taskId) {
          item.state = true;
        }
        
      });
      this.loadTasks()
      
      this.messageService.add({
        severity: 'success',
        summary: 'Succes',
        detail: 'Taskul a fost redeschis cu succes!',
        life: 3000
      });
  
      console.log('Taskul a fost redeschis');
    } catch (error) {
      console.error('Eroare la actualizarea stării sarcinii:', error.message);
    }

  }

  async addTag() {
    if (!this.newTag.TagName) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Trebuie să completezi numele tag-ului!' });
      return;
    }

    try {
      this.newTag.UserId = this.authService.userId(); // Retrieve the userId from the authService
      await this.taskService.createTag(this.newTag);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Tag created successfully!' });
      console.log(this.newTag);
      this.loadTags(this.authService.userId());
      console.log(this.tagList);
      this.hideDialog();
      // Poți face alte acțiuni sau actualizări după crearea tag-ului
    } catch (error) {
      console.error('Error creating tag:', error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create tag.' });
    }
  }


  
  showCreateTaskDialog() {
    this.addTaskDialog = true;
    this.submitted = false;
  }
  showEditTaskDialog()
  {
    this.editTaskDialog = true;
    this.submitted = false;
  }
  showCreateTagDialog(){
    this.addTagDialog = true;
    this.submitted = false;
  }
  hideDialog()
  {
    this.editTaskDialog = false;
    this.addTaskDialog = false;
    this.addTagDialog = false;
    this.submitted = false;
  }
}
