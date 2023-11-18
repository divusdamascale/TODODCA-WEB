import { Component } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss']
})
export class SingupComponent {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private authService:AuthService) {
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
        }
      },
      (error) =>
      {
        console.log(error);
      }
      )
    }
  }
}
