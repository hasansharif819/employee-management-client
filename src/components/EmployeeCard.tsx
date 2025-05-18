import React from "react";
import type { Employee } from "../types/types";

interface EmployeeCardProps {
  employee: Employee;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => {
  return (
    <div className="card mb-4 border-0 shadow-lg">
      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          <div className="bg-primary bg-opacity-10 rounded-circle p-3 me-3">
            <i className="bi bi-person-fill text-primary fs-4"></i>
          </div>
          <div>
            <h5 className="card-title fw-bold mb-1">{employee.name}</h5>
            <span className="badge bg-primary bg-opacity-25 text-primary">
              {employee.position}
            </span>
          </div>
        </div>

        <div className="row g-2 mb-3">
          <div className="col-md-6">
            <div className="d-flex align-items-center">
              <i className="bi bi-envelope-fill text-muted me-2"></i>
              <a href={`mailto:${employee.email}`} className="text-decoration-none">
                {employee.email}
              </a>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex align-items-center">
              <i className="bi bi-calendar-check-fill text-muted me-2"></i>
              <span>{new Date(employee.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {employee.employees && employee.employees.length > 0 && (
          <div className="mt-4 ps-4 border-start border-3 border-primary">
            <h6 className="text-primary mb-3 d-flex align-items-center">
              <i className="bi bi-people-fill me-2"></i>
              Team Members
            </h6>
            {employee.employees.map((sub) => (
              <EmployeeCard key={sub.id} employee={sub} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeCard;