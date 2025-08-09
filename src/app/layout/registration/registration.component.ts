import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { UserForm } from '../../shared/forms/user.form';
import { EmployeeDetailForm } from '../../shared/forms/employee-details.form';
import { AddressForm } from '../../shared/forms/address.form';
import { ContactForm } from '../../shared/forms/contact.form';
import { EmergencyContactForm } from '../../shared/forms/emergency.form';
import { RegisterRequest } from '../../api/auth-client';

@Component({
  selector: 'app-registration',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatStepperModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent implements OnInit {
  formGroup: FormGroup;
  userForm: UserForm;
  employeeDetailForm: EmployeeDetailForm;
  addressForm: AddressForm;
  contactInfoForm: ContactForm;
  emergencyForm: EmergencyContactForm;

  registrationData = RegisterRequest;
  // employeeData = EmployeeCreateDto;
  // addressData = AddressDto;
  // contactData = ContactInformationdto;
  // emergencyData = EmergencyContactDto;

  constructor(private fb: FormBuilder) {
    this.userForm = new UserForm(fb);
    this.employeeDetailForm = new EmployeeDetailForm(fb);
    this.addressForm = new AddressForm(fb);
    this.contactInfoForm = new ContactForm(fb);
    this.emergencyForm = new EmergencyContactForm(fb);

    this.formGroup = fb.group({
      step1: this.employeeDetailForm.employeeForm,
      step2: this.addressForm.addressForm,
      step3: this.contactInfoForm.contactForm,
      step4: this.emergencyForm.emergencyForm,
      step5: this.userForm.userForm,
    });
  }

  ngOnInit(): void {
    const savedForm = localStorage.getItem('registrationForm');
    if (savedForm) {
      this.formGroup.patchValue(JSON.parse(savedForm));
    }

    this.formGroup.valueChanges.subscribe((value) => {
      localStorage.setItem('registrationForm', JSON.stringify(value));
    });
  }

  get step1Form(): FormGroup {
    return this.formGroup.get('step1') as FormGroup;
  }

  get step2Form(): FormGroup {
    return this.formGroup.get('step2') as FormGroup;
  }

  get step3Form(): FormGroup {
    return this.formGroup.get('step3') as FormGroup;
  }

  get step4Form(): FormGroup {
    return this.formGroup.get('step4') as FormGroup;
  }

  get step5Form(): FormGroup {
    return this.formGroup.get('step5') as FormGroup;
  }

  resetForm() {
    localStorage.removeItem('registrationForm');
    this.formGroup.reset();
  }

  submitForm() {}
}
