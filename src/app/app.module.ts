import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';

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
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponentComponent },
  { path: 'signup', component: SingupComponent },
  // Alte rute pot fi adăugate aici
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
    SingupComponent,
    HomeComponent
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
    HttpClientModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
