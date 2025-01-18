import React, { useState } from "react";

import Login from "../components/Login";
import Register from "../components/Register";


const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <h1 className="text-center mb-4">
            Welcome to the Exhibition Platform
          </h1>
          <div className="d-flex justify-content-center mb-3">
            <button
              className={`btn ${
                isLogin ? "btn-primary" : "btn-outline-primary"
              } me-2`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`btn ${
                !isLogin ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>

          {isLogin ? (
            <div>
              <Login />
              <p className="text-center mt-3">
                Don't have an account?{" "}
                <span
                  className="text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => setIsLogin(false)}
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
                >
                  Login here.
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
