import { FormBuilder, FormGroup } from '@angular/forms';

export class UserForm {
  userForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.userForm = fb.group({
      username: '',
      password: '',
      email: '',
    });
  }
}
