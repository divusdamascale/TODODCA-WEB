import { Component } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss'],
  providers: [MessageService]
})
export class SingupComponent {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private authService:AuthService, private messageService:MessageService, private router:Router) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      datebirth: ['', Validators.required]
      
    });
  }
  register() {
    if(this.registerForm.valid)
    {
      this.authService.register(this.registerForm.value)
      .subscribe(
      (response:any) =>
      {
        if(response)
        {
          console.log(response);
          this.messageService.add({ severity: 'success', summary: 'SUCCESFULLY!', detail: 'Contul tau a fost creat cu succes!', life: 3000 });
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        }
      },
      (error) =>
      {
        console.error("A aparut o eroare!");
        this.messageService.add({ severity: 'error', summary: 'ERROR!', detail: 'A aparut o eroare la creearea contului!', life: 3000 });
      }
      );
     
    }
    else {
      
      this.messageService.add({ severity: 'warn', summary: 'WARNING!', detail: 'Ai lasat campuri necompletate!', life: 3000 });
    }
  }
}
