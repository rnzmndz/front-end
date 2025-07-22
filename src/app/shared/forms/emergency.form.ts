import { FormBuilder, FormGroup } from '@angular/forms';
import { EmergencyContactDto } from '../../api/employee-client';

export class EmergencyContactForm {
  emergencyForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.emergencyForm = fb.group({
      firstName: '',
      lastName: '',
      email: '',
    });
  }

  getFormValues(): EmergencyContactDto {
    return this.emergencyForm.value as EmergencyContactDto;
  }

  getUpdateForm(data: EmergencyContactDto | undefined): FormGroup {
    this.emergencyForm = this.fb.group({
      firstName: [{ value: data?.firstName, disable: true }],
      lastName: [{ value: data?.lastName, disable: true }],
      phoneNumber: [{ value: data?.phoneNumber, disable: true }],
    });

    this.emergencyForm.disable;
    return this.emergencyForm;
  }
}
