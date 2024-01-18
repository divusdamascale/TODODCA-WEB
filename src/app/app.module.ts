import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';
import { LoginComponentComponent } from './components/auth/login-component/login-component.component';
import { SingupComponent } from './components/auth/singup/singup.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component'; 
import { TimelineModule } from 'primeng/timeline';
import { ListComponent } from './list/list/list.component';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import * as listserviceTs from 'src/app/services/listservice';
import { RatingModule } from 'primeng/rating';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckboxModule } from 'primeng/checkbox';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { CalendarModule } from 'primeng/calendar';
import { SpeedDialModule } from 'primeng/speeddial';
import {MenuModule} from 'primeng/menu';
import { TasklistComponent } from './components/tasklist/tasklist.component';
import { CustomerService } from './services/customerservice';
import { TaskService } from './services/taskservice';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BlockUI, BlockUIModule } from 'primeng/blockui';
import { ChipModule } from 'primeng/chip';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponentComponent },
  { path: 'signup', component: SingupComponent },
  { path: 'list', component: ListComponent },
  { path: 'tasklist', component: TasklistComponent},

  // Alte rute pot fi adăugate aici
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
    SingupComponent,
    HomeComponent,
    ListComponent,
    NavBarComponent,
    TextInputComponent,
    TasklistComponent,
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
    InputTextModule,  // Import modulele necesare
    ButtonModule,
    DividerModule,
    CardModule,
    AccordionModule,
    FormsModule,
    ReactiveFormsModule,
    TimelineModule,
    TableModule,
    DialogModule,
    TagModule,
    ConfirmDialogModule,
    ToastModule,
    ToolbarModule,
    FileUploadModule,
    RatingModule,
    DropdownModule,
    BrowserAnimationsModule,
    CheckboxModule,
    FormsModule,
    CalendarModule,
    SpeedDialModule,
    MenuModule,
    BlockUIModule,
    ChipModule,

   
  ],
  providers: [listserviceTs.ListService, TaskService, ConfirmationService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
