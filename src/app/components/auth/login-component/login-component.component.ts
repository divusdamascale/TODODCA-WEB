import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss']
})
export class LoginComponentComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private authService:AuthService) {
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
            }
          },
          (error) => {
            console.error('Eroare la autentificare:', error);
          }
        );
    } else {
      alert("Alert");
    }
  } 
}
