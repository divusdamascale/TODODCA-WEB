import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NeAuthGuard } from './guards/neauth.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponentComponent } from './components/auth/login-component/login-component.component';
import { SingupComponent } from './components/auth/singup/singup.component';
import { ListComponent } from './list/list/list.component';
import { AuthGuard } from './guards/auth.guard';
import { TasklistComponent } from './components/tasklist/tasklist.component';



const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponentComponent, canActivate:[AuthGuard]},
  { path: 'signup', component: SingupComponent, canActivate: [AuthGuard]},
  { path: 'list', component: ListComponent, canActivate: [NeAuthGuard]},
  { path: 'tasklist/:listId', component:TasklistComponent, canActivate: [NeAuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
