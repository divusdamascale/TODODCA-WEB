import { Component } from '@angular/core';


interface EventItem{
    title?: string;
    date?: string;
    icon?: string;
    color?: string;
    image?: string;

}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  events: EventItem[];
  constructor() {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}`;

    this.events = [
      { title: 'Sign up', date: formattedDate, icon: 'pi pi pi-user-plus', color: '#9C27B0'},
      { title: 'Login', date: formattedDate, icon: 'pi pi-lock-open', color: '#673AB7' },
      { title: 'Add your list and tasks', date: formattedDate, icon: 'pi pi-user-edit', color: '#FF9800' },
      { title: 'Enjoy', date: formattedDate, icon: 'pi pi-check', color: '#607D8B' }
    ];
  }
}
