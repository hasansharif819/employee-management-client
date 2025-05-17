import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import EmployeeSearch from "./components/EmployeeSearch";

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [view, setView] = useState<"landing" | "login" | "search">("landing");

  const handleLoginSuccess = (receivedToken: string) => {
    setToken(receivedToken);
    setView("search");
  };

  return (
    <div className="container mx-auto">
      <h1 className="my-5 text-center display-4 text-primary">
        Employee Management System
      </h1>

      <div className="d-flex flex-column justify-content-center align-items-center min-vh-50">
        {view === "landing" && (
          <>
            <p className="lead text-center mb-4">
              Welcome to the Employee Management System. Please choose an
              option:
            </p>
            <div className="d-flex gap-3 flex-column flex-md-row">
              <button
                className="btn btn-outline-primary btn-lg px-4"
                onClick={() => setView("login")}
              >
                Login
              </button>
              <button
                className="btn btn-outline-success btn-lg px-4"
                onClick={() => setView("search")}
              >
                Employee Search
              </button>
            </div>
          </>
        )}

        {view === "login" && <Login setToken={handleLoginSuccess} />}

        {view === "search" && <EmployeeSearch token={token ?? undefined} />}
      </div>
    </div>
  );
}

export default App;
