import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToolbarTitleService } from '../../../core/services/toolbar-title.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FetchEmployeeDetailsService } from '../../../core/services/fetch-employee-details.service';
import { EmployeeResponse } from '../../../api/employee-client';
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
    });
  }
}
