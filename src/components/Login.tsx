import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FirebaseError } from "firebase/app";

const Login: React.FC = () => {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{ field: string; message: string } | null>(
    null
  );
  const [showPassword, setShowPassword] = useState(false);

  const getErrorMessage = (error: FirebaseError) => {
    switch (error.code) {
      case "auth/user-not-found":
        return { field: "email", message: "No user found with this email." };
      case "auth/wrong-password":
        return {
          field: "password",
          message: "Incorrect password. Please try again.",
        };
      case "auth/invalid-email":
        return { field: "email", message: "Invalid email address format." };
      case "auth/user-disabled":
        return {
          field: "form",
          message: "This user account has been disabled.",
        };
      default:
        return {
          field: "form",
          message: "Failed to login. Please try again later.",
        };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await login(email, password);
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(getErrorMessage(error));
      } else {
        setError({
          field: "form",
          message: "An unexpected error occurred. Please try again.",
        });
      }
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-8">
          <h2 className="text-center mb-4 fs-1">Login</h2>
          {error && error.field === "form" && (
            <div className="alert alert-danger">{error.message}</div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className={`form-control ${
                  error?.field === "email" ? "is-invalid" : ""
                }`}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {error?.field === "email" && (
                <div className="invalid-feedback">{error.message}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-group position-relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className={`form-control ${
                  error?.field === "password" ? "is-invalid" : ""
                }`}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error?.field === "password" && (
                <div className="invalid-feedback">{error.message}</div>
              )}
              <button
                type="button"
                className="input-group-text border-0 bg-transparent position-absolute end-0 top-50 translate-middle-y"
                style={{ right: "10px" }}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <i className="bi bi-eye-slash"></i>
                ) : (
                  <i className="bi bi-eye"></i>
                )}
                </button>
                </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
