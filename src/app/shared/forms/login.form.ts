import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthRequest } from '../../api/auth-client';

export class LoginForm {
  loginForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.loginForm = fb.group({
      username: '',
      password: '',
    });
  }

  getFormValues(): AuthRequest {
    return this.loginForm.value as AuthRequest;
  }
}
