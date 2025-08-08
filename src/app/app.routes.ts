import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './features/employee/employee-list/employee-list.component';
import { EmployeeDetailComponent } from './features/employee/employee-detail/employee-detail.component';
import { EmployeeUpdateComponent } from './features/employee/employee-update/employee-update.component';
import { LoginComponent } from './layout/login/login.component';
import { AuthGuard } from './core/guard/auth.guard';
import { NgModule } from '@angular/core';
import { HomeComponent } from './features/home/home.component';
import { SideNavComponent } from './layout/side-nav/side-nav.component';
import { RegistrationComponent } from './layout/registration/registration.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegistrationComponent,
  },
  {
    path: '',
    component: SideNavComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'user/:id',
        component: EmployeeDetailComponent,
      },
      {
        path: 'update/:id',
        component: EmployeeUpdateComponent,
      },
      {
        path: 'employee-list',
        component: EmployeeListComponent,
      },
    ],
  },
  { path: '**', redirectTo: 'login' },
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
// })
// export class AppRoutingModule {}
