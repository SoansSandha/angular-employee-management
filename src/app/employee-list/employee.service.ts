import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Employee, EmployeeAPI } from './employee.model.js';

export interface EmployeeWithProfession extends Employee {
  profession?: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl =
    'https://hub.dummyapis.com/employee?noofRecords=50&idStarts=1001';
  storageKey = 'employees';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<EmployeeWithProfession[]> {
    const localEmployees = localStorage.getItem(this.storageKey);
    if (localEmployees) {
      return of(JSON.parse(localEmployees) as EmployeeWithProfession[]);
    }

    return this.http.get<EmployeeAPI[]>(this.apiUrl).pipe(
      map((data) => data.map((employee) => this.transformEmployee(employee))),
      map((employees) => {
        localStorage.setItem(this.storageKey, JSON.stringify(employees));
        return employees;
      }),
      catchError(this.handleError)
    );
  }

  getNextEmployeeId(): number {
    const employees = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    return employees.length > 0? Math.max(...employees.map((e:EmployeeWithProfession) => e.id)) + 1 : 1
  }

  getEmployeeById(id: number): EmployeeWithProfession | undefined {
    const employees = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    return employees.find((employee: EmployeeWithProfession) => employee.id === id);
  }

  addEmployee(employee: EmployeeWithProfession): void {
    const employees = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    employees.push(employee);
    localStorage.setItem(this.storageKey, JSON.stringify(employees));
  }
  

  private transformEmployee(employee: EmployeeAPI): EmployeeWithProfession {
    return {
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      contactNumber: employee.contactNumber,
      age: employee.age,
      dob: employee.dob,
      profession: '',
    };
  }

  updateEmployee(updatedEmployee:EmployeeWithProfession){
    const employees = JSON.parse(localStorage.getItem(this.storageKey)!)
    const index = employees.findIndex((employee: EmployeeWithProfession) => employee.id === updatedEmployee.id);
    if (index !== -1) {
      employees[index] = updatedEmployee;
      localStorage.setItem(this.storageKey, JSON.stringify(employees));
    }
  }

  private handleError(error: any): Observable<Employee[]> {
    console.error(`Error: ${error.message}`);
    return of([] as Employee[]);
  }
}
