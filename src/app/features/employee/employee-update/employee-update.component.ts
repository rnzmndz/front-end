import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { EmployeeDetailForm } from '../../../shared/forms/employee-details.form';
import { AddressForm } from '../../../shared/forms/address.form';
import { ContactForm } from '../../../shared/forms/contact.form';
import { EmergencyContactForm } from '../../../shared/forms/emergency.form';
import { ActivatedRoute } from '@angular/router';
import { ToolbarTitleService } from '../../../core/services/toolbar-title.service';
import {
  AddressDto,
  ContactInformationDto,
  EmergencyContactDto,
  EmployeeManagementService,
  EmployeeRequestDto,
  EmployeeResponse,
} from '../../../api/employee-client';
import { FetchEmployeeDetailsService } from '../../../core/services/fetch-employee-details.service';

@Component({
  selector: 'app-employee-update',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
  ],
  templateUrl: './employee-update.component.html',
  styleUrl: './employee-update.component.scss',
})
export class EmployeeUpdateComponent implements OnInit {
  employeeId!: string;

  //Forms
  employeeDetailsForm: EmployeeDetailForm;
  addressForm: AddressForm;
  contactForm: ContactForm;
  emergencyForm: EmergencyContactForm;

  //Data
  employeeDetail?: EmployeeResponse;
  address?: AddressDto;
  contact?: ContactInformationDto;
  emergency?: EmergencyContactDto;

  //Is Editing allowed
  isEditingEmployeeDetails = false;
  isEditingAddress = false;
  isEditingContact = false;
  isEditingEmergency = false;

  constructor(
    private route: ActivatedRoute,
    private toolbarTitleService: ToolbarTitleService,
    private fb: FormBuilder,
    private employeeService: EmployeeManagementService,
    public fetchEmployeeDetails: FetchEmployeeDetailsService
  ) {
    setTimeout(() => {
      toolbarTitleService.setTitle('Employee Update');
    });

    this.employeeDetailsForm = new EmployeeDetailForm(fb);
    this.addressForm = new AddressForm(fb);
    this.contactForm = new ContactForm(fb);
    this.emergencyForm = new EmergencyContactForm(fb);
  }

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id') ?? '';
    this.fetchEmployeeDetails.loadEmployeeDetails(this.employeeId);
    this.loadEmployeeDetailsData();
    this.loadAddressData();
    this.loadContactData();
    this.loadEmergencyData;
  }

  loadEmployeeDetailsData() {
    this.fetchEmployeeDetails.employeeDetails$.subscribe((data) => {
      if (data) {
        this.employeeDetail = data;
        this.employeeDetailsForm.getUpdateForm(this.employeeDetail);
      }
    });
  }

  loadAddressData() {
    this.fetchEmployeeDetails.address$.subscribe((data) => {
      this.address = data;
      this.addressForm.getUpdateForm(this.address);
    });
  }

  loadContactData() {
    this.fetchEmployeeDetails.contactInfo$.subscribe((data) => {
      this.contact = data;
      this.contactForm.getUpdateForm(this.contact);
    });
  }

  loadEmergencyData() {
    this.fetchEmployeeDetails.emergencyContact$.subscribe((data) => {
      this.emergency = data;
      this.emergencyForm.getUpdateForm(this.emergency);
    });
  }

  toggleEdit(formGroup: FormGroup, isEditing: boolean): boolean {
    const control = formGroup;
    isEditing = !isEditing;
    if (isEditing) {
      control.enable();
    } else {
      control.disable();
    }
    return isEditing;
  }

  toggleEmployeeDetailsEdit() {
    this.isEditingEmployeeDetails = this.toggleEdit(
      this.employeeDetailsForm.employeeForm,
      this.isEditingEmployeeDetails
    );
  }

  toggleAddressEdit() {
    this.isEditingAddress = this.toggleEdit(
      this.addressForm.addressForm,
      this.isEditingAddress
    );
  }

  updateEmployeeDetails() {
    // Delete first all IDs from the data object
    const dataNoId = { ...this.employeeDetail };
    delete dataNoId.id;
    delete dataNoId.addressDto;
    delete dataNoId.contactInformationDto;
    delete dataNoId.emergencyContactDto;

    // Get form values
    const formValues = this.employeeDetailsForm.employeeForm.value;

    if (this.areObjectsEqual(dataNoId, formValues)) {
      this.toggleEmployeeDetailsEdit();
    } else {
      const updatedData: EmployeeRequestDto = {
        ...formValues,
        addressDto: this.employeeDetail?.addressDto,
        contactInformationDto: this.employeeDetail?.contactInformationDto,
        emergencyContactDto: this.employeeDetail?.emergencyContactDto,
      };

      this.employeeService
        .updateEmployee(this.employeeId, updatedData)
        .subscribe({
          next: (response: EmployeeResponse) => {
            console.log('Update successful', response);
            this.fetchEmployeeDetails.loadEmployeeDetails(this.employeeId);
            this.toggleEmployeeDetailsEdit();
          },
          error: (error) => {
            console.error('Update failed', error);
          },
        });
    }
  }

  updateAddress() {
    // Get form values
    const formValues = this.addressForm.addressForm.value;

    if (this.areObjectsEqual(this.address, formValues)) {
      this.toggleAddressEdit();
    } else {
      const updatedData: AddressDto = formValues;

      this.employeeService
        .updateEmployeeAddress(this.employeeId, updatedData)
        .subscribe({
          next: (response: AddressDto) => {
            this.fetchEmployeeDetails.loadEmployeeDetails(this.employeeId);
            this.toggleAddressEdit();
          },
          error: (error) => {
            console.log('Update Failed: ', error);
          },
        });
    }
  }

  areObjectsEqual(obj1: any, obj2: any): boolean {
    return Object.keys(obj1).every((key) => obj1[key] === obj2[key]);
  }
}
