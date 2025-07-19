import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map } from 'rxjs';
import {
  EmployeeManagementService,
  EmployeeResponse,
} from '../../api/employee-client';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FetchEmployeeDetailsService {
  employeeId!: string;
  private employeeDetailsSubject = new BehaviorSubject<
    EmployeeResponse | undefined
  >(undefined);
  employeeDetails$ = this.employeeDetailsSubject.asObservable();
  address$ = this.employeeDetails$.pipe(map((emp) => emp?.addressDto));
  contactInfo$ = this.employeeDetails$.pipe(
    map((emp) => emp?.contactInformationDto)
  );
  emergencyContact$ = this.employeeDetails$.pipe(
    map((emp) => emp?.emergencyContactDto)
  );

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeManagementService,
  ) {
    this.employeeDetails$.pipe(
      filter((details): details is EmployeeResponse => !!details)
    );
  }

  loadEmployeeDetails(employeeId: string) {
    this.employeeService.getEmployeeById(employeeId).subscribe({
      next: (data: EmployeeResponse) => {
        this.employeeDetailsSubject.next(data);
      },
      error: (err) => {
        console.error('Failed to load personal detail: ', err);
      },
    });
  }
}
