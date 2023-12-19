import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { List } from 'src/app/models/list';
import { LoggedUser } from 'src/app/models/logged-user';
import { Profile } from 'src/app/models/profile';
import { Tag } from 'src/app/models/tag';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss'],
  providers: [MessageService]
})
export class LoginComponentComponent {
    loginForm = new  FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  constructor(private formBuilder: FormBuilder,private authService:AuthService, private router:Router, private messageService:MessageService) {

  }
  private lastErrorTimestamp: number;

  login() {
    const now = new Date().getTime();
    const minTimeBetweenToasts = 3000;
    
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value)
      
        .subscribe(
          
          (response: any) => {
            if (response && response.token ) {
              this.authService.saveJwtToken(response.token);
              this.authService.setIsAuthenticated(true);
              
              this.messageService.add({ severity: 'success', summary: 'SUCCESFULLY!', detail: 'Te-ai autentificat cu succes!', life: 3000 });
              setTimeout(() => {
                this.router.navigate(['/list']);
              }, 2000);
              window.location.reload();
   
            }

          },
          (error) => {
            console.error('Eroare la autentificare:', error)
           
              if(!this.lastErrorTimestamp || now - this.lastErrorTimestamp > minTimeBetweenToasts)
                {
                  this.messageService.add({ severity: 'error', summary: 'ERROR!', detail: 'Nume sau parola gresita!', life: 3000 });
                  this.lastErrorTimestamp = now;
                } 
           
          }
        );
    } else {
  
      if(!this.lastErrorTimestamp || now - this.lastErrorTimestamp > minTimeBetweenToasts)
      {
      this.messageService.add({ severity: 'warn', summary: 'WARNING!', detail: 'Ai lasat campuri necompletate!', life: 3000 });
      this.lastErrorTimestamp = now;
    }
    }
  } 
}
