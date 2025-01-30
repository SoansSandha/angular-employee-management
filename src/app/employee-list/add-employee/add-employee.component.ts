import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmployeeService, EmployeeWithProfession } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  imports: [ReactiveFormsModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
})
export class AddEmployeeComponent {
  // @Output() close = new EventEmitter();
  @Output() employeeAdded = new EventEmitter<EmployeeWithProfession>();

  employeeForm = new FormGroup({
    firstName: new FormControl('', { validators: [Validators.required] }),
    lastName: new FormControl('', { validators: [Validators.required] }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    contactNumber: new FormControl('', {
      validators: [Validators.required, Validators.pattern('^[0-9]+$')],
    }),
    dob: new FormControl('', { validators: [Validators.required] }),
    profession: new FormControl('', { validators: [Validators.required] }),
  });
  professions = ['Engineer', 'Manager', 'HR', 'Sales'];

  constructor(private employeeService: EmployeeService, private router:Router) {}

  addEmployee(): void {
    if (this.employeeForm.valid) {
      const newEmployee = {
        id: this.employeeService.getNextEmployeeId(),
        firstName: this.employeeForm.value.firstName!,
        lastName: this.employeeForm.value.lastName!,
        email: this.employeeForm.value.email!,
        contactNumber: this.employeeForm.value.contactNumber!,
        dob: this.employeeForm.value.dob!,
        age: this.calculateAge(this.employeeForm.value.dob!),
        profession: this.employeeForm.value.profession!,
      };
      this.employeeService.addEmployee(newEmployee);
      this.router.navigate(['/employee-list']);
    }
  }
  calculateAge(dob: string): number {
    const birthDate = new Date(dob);
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}
