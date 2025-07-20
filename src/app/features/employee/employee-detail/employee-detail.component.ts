import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToolbarTitleService } from '../../../core/services/toolbar-title.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FetchEmployeeDetailsService } from '../../../core/services/fetch-employee-details.service';
import {
  AddressDto,
  ContactInformationDto,
  EmergencyContactDto,
  EmployeeResponse,
} from '../../../api/employee-client';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-employee-detail',
  imports: [CommonModule, MatCardModule, DatePipe],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.scss',
})
export class EmployeeDetailComponent implements OnInit {
  employeeId!: string;
  employeeDetails?: EmployeeResponse;
  address?: AddressDto;
  contact?: ContactInformationDto;
  emergency?: EmergencyContactDto;

  constructor(
    private route: ActivatedRoute,
    private toolbarTitleService: ToolbarTitleService,
    private fetchEmployeeDetailService: FetchEmployeeDetailsService
  ) {
    setTimeout(() => {
      this.toolbarTitleService.setTitle('Employee Detail');
    });
  }

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id') ?? '';
    this.fetchEmployeeDetailService.loadEmployeeDetails(this.employeeId);
    this.fetchEmployeeDetailService.employeeDetails$.subscribe((data) => {
      this.employeeDetails = data;

      this.address = this.employeeDetails?.addressDto;
      this.contact = this.employeeDetails?.contactInformationDto;
      this.emergency = this.employeeDetails?.emergencyContactDto;
    });
  }
}
