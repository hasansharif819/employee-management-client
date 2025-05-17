/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import axios from "axios";

interface Employee {
  id: number;
  name: string;
  email: string;
  position: string;
  createdAt: string;
  employees: Employee[];
}

interface EmployeeSearchProps {
  token?: string; // token is optional now
}

const EmployeeCard: React.FC<{ employee: Employee }> = ({ employee }) => {
  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h5 className="card-title fw-bold">{employee.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{employee.position}</h6>
        <p className="mb-1">
          <strong>Email:</strong> {employee.email}
        </p>
        <p className="mb-0">
          <strong>Joined:</strong>{" "}
          {new Date(employee.createdAt).toLocaleString()}
        </p>

        {employee.employees && employee.employees.length > 0 && (
          <div className="mt-4 ps-3 border-start border-primary">
            <h6 className="text-primary mb-3">Subordinates:</h6>
            {employee.employees.map((sub) => (
              <EmployeeCard key={sub.id} employee={sub} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const EmployeeSearch: React.FC<EmployeeSearchProps> = ({ token }) => {
  const [employeeId, setEmployeeId] = useState("");
  const [employeeData, setEmployeeData] = useState<Employee | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setEmployeeData(null);

    const endpoint = token
      ? `http://localhost:5000/api/employees/protected/${employeeId}`
      : `http://localhost:5000/api/employees/${employeeId}`;

    try {
      const response = await axios.get(endpoint, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      setEmployeeData(response.data);
    } catch (err) {
      setError("❌ Error fetching employee data. Please check the ID.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center flex-column py-5">
      <form
        onSubmit={handleSubmit}
        className="w-100"
        style={{ maxWidth: "500px" }}
      >
        <div className="input-group mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Enter Employee ID"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary">
            🔍 Search
          </button>
        </div>
      </form>

      {error && (
        <div className="alert alert-danger w-100" style={{ maxWidth: "500px" }}>
          {error}
        </div>
      )}

      {employeeData && (
        <div className="w-100 mt-4" style={{ maxWidth: "800px" }}>
          <EmployeeCard employee={employeeData} />
        </div>
      )}
    </div>
  );
};

export default EmployeeSearch;
