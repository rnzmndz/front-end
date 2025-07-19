import { Routes } from '@angular/router';
import { EmployeeListComponent } from './features/employee/employee-list/employee-list.component';
import { EmployeeDetailComponent } from './features/employee/employee-detail/employee-detail.component';

export const routes: Routes = [
  {
    path: 'user/:id',
    component: EmployeeDetailComponent,
  },
  {
    path: 'employee-list',
    component: EmployeeListComponent,
  },
];
