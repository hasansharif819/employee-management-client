import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EmployeeSearch from "./EmployeeSearch";
import axios from "axios";
import { vi, describe, it, afterEach, expect } from "vitest";

// Mock axios
vi.mock("axios");
const mockedAxios = axios as unknown as {
  get: ReturnType<typeof vi.fn>;
};

describe("EmployeeSearch", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders input and button", () => {
    render(<EmployeeSearch />);
    expect(screen.getByPlaceholderText("Enter Employee ID")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  it("fetches and displays employee data", async () => {
    mockedAxios.get = vi.fn().mockResolvedValueOnce({
      data: {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        position: "Developer",
        createdAt: "2023-01-01T00:00:00.000Z",
        employees: [],
      },
    });

    render(<EmployeeSearch />);

    fireEvent.change(screen.getByPlaceholderText("Enter Employee ID"), {
      target: { value: "1" },
    });

    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Developer")).toBeInTheDocument();
      expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
    });
  });

  it("shows error message on fetch failure", async () => {
    mockedAxios.get = vi.fn().mockRejectedValueOnce(new Error("Network error"));

    render(<EmployeeSearch />);

    fireEvent.change(screen.getByPlaceholderText("Enter Employee ID"), {
      target: { value: "999" },
    });

    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    await waitFor(() => {
      expect(screen.getByText(/❌ Error fetching employee data/i)).toBeInTheDocument();
    });
  });
});
