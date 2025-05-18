import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmployeeCard from "./EmployeeCard";
import AddEmployeeModal from "./AddEmployeeModal";
import type { Employee, EmployeeSearchProps, NewEmployeeData } from "../types/types";

const EmployeeSearch: React.FC<EmployeeSearchProps> = ({ token }) => {
  const [employeeId, setEmployeeId] = useState("");
  const [employeeData, setEmployeeData] = useState<Employee | null>(null);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setEmployeeData(null);
    setIsLoading(true);

    const endpoint = token
      ? `http://localhost:5000/api/employees/protected/${employeeId}`
      : `http://localhost:5000/api/employees/${employeeId}`;

    try {
      const response = await axios.get(endpoint, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      setEmployeeData(response.data);
      toast.success("Employee data loaded successfully!");
    } catch (err) {
      setError("Error fetching employee data. Please check the ID and try again.");
      toast.error("Failed to fetch employee data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddEmployee = async (employee: NewEmployeeData) => {
    if (!employee.name || !employee.email || !employee.password || !employee.position) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsLoading(true);
    try {
      await axios.post("http://localhost:5000/api/auth/register", employee, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      toast.success("Employee added successfully!");
      setShowModal(false);
    } catch (err) {
      toast.error("Failed to add employee. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow border-0">
            <div className="card-header bg-primary text-white">
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="mb-0">Employee Directory</h3>
                <button
                  className="btn btn-light"
                  onClick={() => setShowModal(true)}
                >
                  <i className="bi bi-plus-circle me-2"></i>Add Employee
                </button>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="input-group mb-4">
                  <span className="input-group-text bg-light">
                    <i className="bi bi-search"></i>
                  </span>
                  <input
                    type="number"
                    className="form-control form-control-lg"
                    placeholder="Enter Employee ID"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="btn btn-primary px-4"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Searching...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-search me-2"></i>Search
                      </>
                    )}
                  </button>
                </div>
              </form>

              {error && (
                <div className="alert alert-danger d-flex align-items-center">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  <div>{error}</div>
                </div>
              )}

              {employeeData && (
                <div className="mt-4">
                  <h4 className="mb-4 text-primary">
                    <i className="bi bi-person-badge me-2"></i>
                    Employee Details
                  </h4>
                  <EmployeeCard employee={employeeData} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <AddEmployeeModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddEmployee}
        isLoading={isLoading}
      />
    </div>
  );
};

export default EmployeeSearch;