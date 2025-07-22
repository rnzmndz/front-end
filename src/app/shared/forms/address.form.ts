import { FormBuilder, FormGroup } from '@angular/forms';
import { AddressDto } from '../../api/employee-client';

export class AddressForm {
  addressForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.addressForm = fb.group({
      street: '',
      city: '',
      state: '',
      zipCode: '',
    });
  }

  getFormValues(): AddressDto {
    return this.addressForm.value as AddressDto;
  }

  getUpdateForm(data: AddressDto | undefined): FormGroup {
    this.addressForm = this.fb.group({
      street: [{ value: data?.street, disable: true }],
      city: [{ value: data?.city, disable: true }],
      state: [{ value: data?.state, disable: true }],
      zipCode: [{ value: data?.zipCode, disable: true }],
    });

    this.addressForm.disable;
    return this.addressForm;
  }
}
