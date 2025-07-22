import { FormBuilder, FormGroup } from '@angular/forms';
import { AddressDto, ContactInformationDto } from '../../api/employee-client';

export class ContactForm {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = fb.group({
      phoneNumber: '',
      email: '',
    });
  }

  getFormValues(): ContactInformationDto {
    return this.contactForm.value as ContactInformationDto;
  }

  getUpdateForm(data: ContactInformationDto | undefined): FormGroup {
    this.contactForm = this.fb.group({
      phoneNumber: [{ value: data?.phoneNumber, disable: true }],
      email: [{ value: data?.email, disable: true }],
    });

    this.contactForm.disable;
    return this.contactForm;
  }
}
