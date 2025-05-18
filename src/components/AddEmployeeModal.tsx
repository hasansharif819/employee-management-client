import React, { useState } from "react";
import type { NewEmployeeData } from "../types/types";

interface AddEmployeeModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (employee: NewEmployeeData) => Promise<void>;
  isLoading: boolean;
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({ 
  show, 
  onClose, 
  onSubmit, 
  isLoading 
}) => {
  const [newEmployee, setNewEmployee] = useState<NewEmployeeData>({
    name: "",
    email: "",
    password: "",
    position: "",
    manager_id: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({
      ...prev,
      [name]: name === "manager_id" ? (value ? parseInt(value) : null) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(newEmployee);
  };

  if (!show) return null;

  return (
    <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">
              <i className="bi bi-person-plus me-2"></i>
              Add New Employee
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
              disabled={isLoading}
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Full Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={newEmployee.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={newEmployee.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password <span className="text-danger">*</span>
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={newEmployee.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="position" className="form-label">
                  Position <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="position"
                  name="position"
                  value={newEmployee.position}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="manager_id" className="form-label">
                  Manager ID (optional)
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="manager_id"
                  name="manager_id"
                  value={newEmployee.manager_id || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Adding...
                  </>
                ) : (
                  "Add Employee"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeModal;