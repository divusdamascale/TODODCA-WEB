import { Component } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { FormsModule } from '@angular/forms'; // Add this line

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss'],
  providers: [MessageService]
})
export class SingupComponent {
  
   

  constructor(private formBuilder: FormBuilder,private authService:AuthService, private messageService:MessageService, private router:Router) {
 
  }
  registerForm =  this.formBuilder.group({
  username: new FormControl('', Validators.required),
  email: new FormControl('',[Validators.required, Validators.email]),
  password: new FormControl('', Validators.required),
  lastname: new FormControl('', Validators.required),
  firstname: new FormControl('', Validators.required),
  datebirth: new FormControl('', Validators.required),
})
  
  

  private lastErrorTimeStamp:number;
  
  register() {
    const now = new Date().getTime();
    const minTimeBetweenToasts = 3000;

    if(this.registerForm.valid)
    {
      this.authService.register(this.registerForm.value)
      .subscribe(
      (response:any) =>
      {
        if(response)
        {
          console.log("succes!");
          this.messageService.add({ severity: 'success', summary: 'SUCCESFULLY!', detail: 'Contul tau a fost creat cu succes!', life: 3000 });
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        }
      },
      (error) =>
      {
        
        console.error('Eroare la autentificare:', error)
           
        if(!this.lastErrorTimeStamp || now - this.lastErrorTimeStamp > minTimeBetweenToasts)
          {
            this.messageService.add({ severity: 'error', summary: 'ERROR!', detail: 'A aparut o eroare la creearea contului!', life: 3000 });
            this.lastErrorTimeStamp = now;
          } 
      }
      );
    } else {
      
      if(!this.lastErrorTimeStamp || now - this.lastErrorTimeStamp > minTimeBetweenToasts)
      {
      this.messageService.add({ severity: 'warn', summary: 'WARNING!', detail: 'Ai lasat campuri necompletate!', life: 3000 });
      this.lastErrorTimeStamp = now;
    }
    }
  }
}
