import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FirebaseError } from "firebase/app";

const Register: React.FC = () => {
  const { register, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState<{ field: string; message: string } | null>(
    null
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
  const validateName = (name: string) => /^[A-Za-z- ]+$/.test(name);

  const getErrorMessage = (error: FirebaseError) => {
    switch (error.code) {
      case "auth/email-already-in-use":
        return {
          field: "email",
          message:
            "This email is already in use. Please use a different email.",
        };
      case "auth/weak-password":
        return { field: "password", message: "The password is too weak." };
      case "auth/invalid-email":
        return { field: "email", message: "Invalid email address format." };
      default:
        return {
          field: "form",
          message: "Failed to register. Please try again later.",
        };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!firstName || !lastName) {
      setError({
        field: "name",
        message: "Please provide both first name and last name.",
      });
      return;
    }
    if (!validateName(firstName) || !validateName(lastName)) {
      setError({
        field: "name",
        message:
          "First name and last name can only contain letters, hyphens, and spaces.",
      });
      return;
    }
    if (!validateEmail(email)) {
      setError({
        field: "email",
        message: "Please enter a valid email address.",
      });
      return;
    }
    if (!validatePassword(password)) {
      setError({
        field: "password",
        message:
          "Password must include: <ul><li>At least 8 characters</li><li>One uppercase letter</li><li>One lowercase letter</li><li>One number</li></ul>",
      });
      return;
    }
    if (password !== confirmPassword) {
      setError({
        field: "password",
        message: "Passwords do not match. Please try again.",
      });
      return;
    }

    try {
      await register(email, password, firstName, lastName);
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(getErrorMessage(error));
      } else {
        setError({
          field: "form",
          message: "An unexpected error occurred. Please try again.",
        });
      }
      console.error("Failed to register:", error);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-8">
          <h2 className="text-center mb-4 fs-1">Register</h2>
          {error && error.field === "form" && (
            <div className="alert alert-danger">{error.message}</div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                className={`form-control ${
                  error?.field === "name" ? "is-invalid" : ""
                }`}
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              {error?.field === "name" && (
                <div className="invalid-feedback">{error.message}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className={`form-control ${
                  error?.field === "name" ? "is-invalid" : ""
                }`}
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              {error?.field === "name" && (
                <div className="invalid-feedback">{error.message}</div>
              )}
            </div>
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
                <div
                  className="invalid-feedback"
                  dangerouslySetInnerHTML={{ __html: error.message }}
                ></div>
              )}<button
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
            </div></div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <div className="input-group position-relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  className={`form-control ${
                    error?.field === "password" ? "is-invalid" : ""
                  }`}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="input-group-text border-0 bg-transparent position-absolute end-0 top-50 translate-middle-y"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? (
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
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
