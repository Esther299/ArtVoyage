import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-sm-10 col-md-6 col-lg-5">
          <h1 className="text-center mb-4">Welcome to ArtVoyage</h1>

          <div
            className="d-flex justify-content-center mb-4"
            role="group"
            aria-label="Login and Register options"
          >
            <button
              className={`btn custom-btn ${
                isLogin ? "active-btn" : "inactive-btn"
              } me-2`}
              onClick={() => setIsLogin(true)}
              aria-pressed={isLogin}
            >
              Login
            </button>
            <button
              className={`btn custom-btn ${
                !isLogin ? "active-btn" : "inactive-btn"
              }`}
              onClick={() => setIsLogin(false)}
              aria-pressed={!isLogin}
            >
              Register
            </button>
          </div>
          <div className="card authcard shadow">
            <div className="card-body">
              {isLogin ? (
                <div>
                  <Login />
                  <p className="text-center mt-3">
                    Don't have an account?{" "}
                    <span
                      className="text-primary"
                      style={{ cursor: "pointer" }}
                      onClick={() => setIsLogin(false)}
                      role="button"
                      aria-label="Go to Register form"
                    >
                      Register here.
                    </span>
                  </p>
                </div>
              ) : (
                <div>
                  <Register />
                  <p className="text-center mt-3">
                    Already have an account?{" "}
                    <span
                      className="text-primary"
                      style={{ cursor: "pointer" }}
                      onClick={() => setIsLogin(true)}
                      role="button"
                      aria-label="Go to Login form"
                    >
                      Login here.
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
