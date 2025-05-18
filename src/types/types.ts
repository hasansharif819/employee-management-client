export interface Employee {
  id: number;
  name: string;
  email: string;
  position: string;
  createdAt: string;
  employees: Employee[];
}

export interface EmployeeSearchProps {
  token?: string;
}

export interface NewEmployeeData {
  name: string;
  email: string;
  password: string;
  position: string;
  manager_id: number | null;
}