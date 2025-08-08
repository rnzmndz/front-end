import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginForm } from '../../shared/forms/login.form';
import { decodeJwt } from '../../shared/utils/jwt-utils';

@Component({
  selector: 'app-login',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: LoginForm;
  token?: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = new LoginForm(fb);
  }

  async submit() {
    try {
      if (await this.authService.login(this.loginForm.getFormValues())) {
        this.router.navigate(['/home']);
      } else {
        this.error = 'Invalid credentials';
      }
    } catch (err) {
      this.error = 'Login failed. Please try again.';
      console.error('Login error:', err);
    }
  }

  @Input() error: string | null = null;

  // @Output() submitEM = new EventEmitter();
}
