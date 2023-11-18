import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { catchError, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss'],
  providers: [MessageService]
})
export class LoginComponentComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private authService:AuthService, private router:Router, private messageService:MessageService) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      
  
    });
  }
  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value)
      
        .subscribe(
          
          (response: any) => {
            if (response && response.token) {
              this.authService.saveJwtToken(response.token);
              this.authService.setIsAuthenticated(true);
              console.log("a mers");
              this.messageService.add({ severity: 'success', summary: 'SUCCESFULLY!', detail: 'Te-ai autentificat cu succes!', life: 3000 });
              setTimeout(() => {
                this.router.navigate(['/list']);
              }, 2000);
   
            }

          },
          (error) => {
            console.error('Eroare la autentificare:', error)
            this.messageService.add({ severity: 'error', summary: 'ERROR!', detail: 'Nume sau parola gresita!', life: 3000 });
          }
        );
    } else {
      this.messageService.add({ severity: 'warn', summary: 'WARNING!', detail: 'Ai lasat campuri necompletate!', life: 3000 });
    }
  } 
}
