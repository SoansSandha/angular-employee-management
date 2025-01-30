import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService, EmployeeWithProfession } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-edit-employee',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css',
})
export class EditEmployeeComponent implements OnInit {
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

  professions: string[] = ['Engineer', 'Manager', 'HR', 'Sales'];
  employeeId: number | null = null;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.employeeId = +id;
        this.loadEmployee(+id);
      }
    });
  }

  loadEmployee(id:number) {
    const employee = this.employeeService.getEmployeeById(id)
    if(employee){
      this.employeeForm.patchValue(employee)
    }else {
      this.router.navigate(['/employee-list']);
    }
  }

  editEmployee(){
    if (this.employeeForm.valid && this.employeeId !== null) {
      const updatedEmployee: EmployeeWithProfession ={
        id:this.employeeId,
        firstName: this.employeeForm.value.firstName!,
        lastName: this.employeeForm.value.lastName!,
        email: this.employeeForm.value.email!,
        contactNumber: this.employeeForm.value.contactNumber!,
        dob: this.employeeForm.value.dob!,
        age: this.calculateAge(this.employeeForm.value.dob!),
        profession: this.employeeForm.value.profession!,
      }
      this.employeeService.updateEmployee(updatedEmployee)
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
