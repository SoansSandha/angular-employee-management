import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.model.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  imports: [],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.employees = data;
        } else {
          this.error =
            'Sorry No employee data available, Please try again later!';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error fetching employee data';
        this.loading = false;
      },
    });
  }

  editEmployee(employee: Employee): void {
    this.router.navigate([`/employee-list/${employee.id}/edit`]);
  }

  deleteEmployee(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employees = this.employees.filter((employee) => employee.id !== id);
      localStorage.setItem(
        this.employeeService.storageKey,
        JSON.stringify(this.employees)
      );
    }
  }
}
