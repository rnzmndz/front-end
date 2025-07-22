import { FormBuilder, FormGroup } from '@angular/forms';
import {
  AddressDto,
  ContactInformationDto,
  EmergencyContactDto,
  EmployeeRequestDto,
  EmployeeResponse,
} from '../../api/employee-client';

export class EmployeeDetailForm {
  employeeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.employeeForm = fb.group({
      firstName: [''],
      middleName: [''],
      lastName: [''],
      jobTitle: [''],
      imageUrl: [''],
      hiredDate: [''],
      birthDate: '',
    });
  }

  getFormValue(): EmployeeRequestDto {
    return this.employeeForm.value as EmployeeRequestDto;
  }

  getUpdateForm(data: EmployeeResponse | undefined): FormGroup {
    this.employeeForm = this.fb.group({
      firstName: [{ value: data?.firstName ?? '', disabled: true }],
      middleName: [{ value: data?.middleName ?? '', disabled: true }],
      lastName: [{ value: data?.lastName ?? '', disabled: true }],
      jobTitle: [{ value: data?.jobTitle ?? '', disabled: true }],
      imageUrl: [{ value: data?.imageUrl ?? '', disabled: true }],
      hiredDate: [{ value: data?.hiredDate ?? '', disabled: true }],
      birthDate: [{ value: data?.birthDate ?? '', disabled: true }],
    });

    this.employeeForm.disable();
    return this.employeeForm;
  }
}
