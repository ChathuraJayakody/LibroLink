import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: any = {
    username: '',
    email: '',
    password: ''
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    const { username, email, password } = this.form;
    this.authService.register(username, email, password).subscribe({
      next: data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        // Optionally redirect to login after success
        setTimeout(() => this.router.navigate(['/auth/login']), 1500);
      },
      error: err => {
        this.errorMessage = err.error.message || 'Registration failed';
        this.isSignUpFailed = true;
      }
    });
  }
}
