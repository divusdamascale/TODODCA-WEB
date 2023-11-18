import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponentComponent } from './components/auth/login-component/login-component.component';
import { SingupComponent } from './components/auth/singup/singup.component';
import { ListComponent } from './list/list/list.component';

const routes: Routes = [

  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponentComponent},
  { path: 'signup', component: SingupComponent},
   {path: 'list', component: ListComponent, canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
