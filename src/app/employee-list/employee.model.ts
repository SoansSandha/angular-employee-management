export interface EmployeeAPI {
    id: number;
    imageUrl: string;
    firstName: string;
    lastName: string;
    email: string;
    contactNumber: string;
    age: number;
    dob: string;
    salary: number;
    address: string;
}

export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    contactNumber: string;
    age: number;
    dob: string;
}