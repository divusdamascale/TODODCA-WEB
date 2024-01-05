import { Component } from '@angular/core';

import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { FormsModule } from '@angular/forms'; // Add this line
import { debounceTime, finalize, map, switchMap, take } from 'rxjs';

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
  username: ['', Validators.required],
   email: ['',[Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(6)]],
  lastname: ['', Validators.required],
  firstname: ['', Validators.required],
  birthDate: ['', Validators.required],
})
  

  private lastErrorTimeStamp:number;
  
  register() {
    const now = new Date().getTime();
    const minTimeBetweenToasts = 3000;

    //datebirth vreau sa fie formatat yyyy-mm-dd
    var datebirth = new Date(this.registerForm.value.birthDate);
    this.registerForm.value.birthDate = datebirth.getFullYear() + "-" + (datebirth.getMonth() + 1) + "-" + datebirth.getDate();
    console.log(this.registerForm.value.birthDate);
    console.log(this.registerForm.value);

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
    } 
  }
  //  validateEmailNotTaken(): AsyncValidatorFn {

  //       return (control: AbstractControl) => {
  //         return control.valueChanges.pipe(
  //           debounceTime(300),
  //           take(1),
  //           switchMap(() =>  {
  //             return this.authService.checkEmailExists(control.value).pipe(
  //               map(result => result ? {emailExists: true} : null),
  //               finalize(() => control.markAsTouched())
  //             )
  //             console.log(this.validateEmailNotTaken);
  //           })
  //         )
         
  //       }
  //     }
}
