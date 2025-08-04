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

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = new LoginForm(fb);
  }

  // login() {
  //   this.auth.login();
  //   this.router.navigate(['']);
  // }

  submit() {
    console.log(this.loginForm.getFormValues());
    this.authService.login(this.loginForm.getFormValues());
  }
  @Input() error: string | null = null;

  @Output() submitEM = new EventEmitter();
}
