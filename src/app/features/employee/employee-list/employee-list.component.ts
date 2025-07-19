import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  EmployeeList,
  EmployeeManagementService,
} from '../../../api/employee-client';
import { ToolbarTitleService } from '../../../core/services/toolbar-title.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-employee-list',
  imports: [
    FormsModule,
    CommonModule,
    MatListModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatTooltipModule,
    RouterModule,
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent implements OnInit {
  router: Router;
  employeeList: EmployeeList[] = [];
  filteredEmployee: EmployeeList[] = [];
  pageData: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  } = {
    size: 0,
    totalElements: 0,
    totalPages: 0,
    number: 0,
  };

  currentPage = 0;
  pageSize = 10;
  searchQuery = '';

  constructor(
    private apiService: EmployeeManagementService,
    private toolbarTitleService: ToolbarTitleService,
    private dialog: MatDialog
  ) {
    this.router = new Router();
    setTimeout(() => {
      this.toolbarTitleService.setTitle('Employee List');
    });
  }

  ngOnInit(): void {
    this.loadPage(this.currentPage);
  }

  loadPage(page: number): void {
    this.apiService
      .getAllEmployees(page, this.pageSize, 'body', false, {
        httpHeaderAccept: 'application/json',
      })
      .subscribe({
        next: (data: any) => {
          console.log('Full API Response:', data);

          this.employeeList = data?.content ?? [];
          this.updateData(this.employeeList);

          this.pageData = {
            size: data?.size ?? 0,
            totalElements: data?.totalElements ?? 0,
            totalPages: data?.totalPages ?? 0,
            number: data?.number ?? 0,
          };

          this.currentPage = this.pageData.number;
        },
        error: (error) => {
          console.error('Failed to load employee data:', error);
        },
      });
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.loadPage(event.pageIndex);
  }

  applyFilter() {
    const query = this.searchQuery.toLowerCase().trim();
    if (!query) {
      this.filteredEmployee = this.employeeList;
      return;
    }

    this.filteredEmployee = this.employeeList.filter((item) =>
      (item.firstName + ' ' + item.lastName).toLowerCase().includes(query)
    );
  }

  updateData(data: EmployeeList[]): void {
    this.employeeList = data;
    this.applyFilter();
  }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'profile-picture.jpg'; // fallback image path
  }

  toggleDelete(userId: string | undefined) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Are you sure you want to delete this employee?' },
    });
    console.log('Delete button Clicked');

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (userId) {
          this.apiService.deleteEmployee(userId).subscribe({
            next: () => {
              // Reload the current page after successful deletion
              this.loadPage(this.currentPage);
            },
            error: (error) => {
              console.error('Failed to delete user:', error);
            },
          });
        }
      }
    });
  }

  toggleUpdate(userId: string | undefined) {
    this.router.navigate(['/update', userId]);
  }
}
