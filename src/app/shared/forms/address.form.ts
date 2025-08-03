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
      street: [{ value: data?.street, disabled: true }],
      city: [{ value: data?.city, disabled: true }],
      state: [{ value: data?.state, disabled: true }],
      zipCode: [{ value: data?.zipCode, disabled: true }],
    });

    this.addressForm.disable;
    return this.addressForm;
  }
}
