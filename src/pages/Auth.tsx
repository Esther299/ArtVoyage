import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to the Exhibition Platform</h1>
      <div style={{ margin: "20px" }}>
        <button
          onClick={() => setIsLogin(true)}
          style={{ marginRight: "10px" }}
        >
          Login
        </button>
        <button onClick={() => setIsLogin(false)}>Register</button>
      </div>

      {isLogin ? (
        <div>
          <h2>Login</h2>
          <Login />
          <p>
            Don't have an account?{" "}
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => setIsLogin(false)}
            >
              Register here.
            </span>
          </p>
        </div>
      ) : (
        <div>
          <h2>Register</h2>
          <Register />
          <p>
            Already have an account?{" "}
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => setIsLogin(true)}
            >
              Login here.
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Auth;
