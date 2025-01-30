import { Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AddEmployeeComponent } from './employee-list/add-employee/add-employee.component';
import { EditEmployeeComponent } from './employee-list/edit-employee/edit-employee.component';

export const routes: Routes = [
  { path: 'employee-list', component: EmployeeListComponent },
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: '', redirectTo: '/employee-list', pathMatch: 'full' },
  { path: 'employee-list/:id/edit', component: EditEmployeeComponent },
  { path: '**', redirectTo: '/employee-list', pathMatch: 'full' },
];
