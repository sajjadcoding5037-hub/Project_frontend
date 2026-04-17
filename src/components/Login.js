// src/components/Login.js

import React, { useState } from "react";

const API_BASE_URL = "https://projectbackend-production-378d.up.railway.app";

function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [uiState, setUiState] = useState({
    loading: false,
    error: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    setUiState({ loading: true, error: "" });

    try {
      const loginResponse = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        throw new Error(loginData?.message || "Invalid username or password");
      }

      // Store token if provided
      if (loginData?.token) {
        localStorage.setItem("auth_token", loginData.token);
      }

      console.log("Login successful:", loginData);

      alert("Login successful!");

      // 🔥 future improvement:
      // window.location.href = "/dashboard";

    } catch (loginError) {
      console.error("Login failed:", loginError);
      setUiState({
        loading: false,
        error: loginError.message || "Something went wrong",
      });
      return;
    }

    setUiState({ loading: false, error: "" });
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.loginCard}>
        <h2 style={styles.heading}>Login</h2>

        <form onSubmit={handleLoginSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={credentials.username}
            onChange={handleInputChange}
            style={styles.inputField}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleInputChange}
            style={styles.inputField}
            required
          />

          {uiState.error && (
            <p style={styles.errorText}>{uiState.error}</p>
          )}

          <button
            type="submit"
            style={styles.submitButton}
            disabled={uiState.loading}
          >
            {uiState.loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f6f8",
  },
  loginCard: {
    width: "380px",
    padding: "32px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "24px",
  },
  inputField: {
    width: "100%",
    padding: "12px",
    marginBottom: "14px",
    borderRadius: "6px",
    border: "1px solid #dcdcdc",
    fontSize: "15px",
  },
  submitButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#1976d2",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    fontSize: "15px",
    cursor: "pointer",
  },
  errorText: {
    color: "#d32f2f",
    marginBottom: "12px",
    fontSize: "14px",
  },
};

export default Login;
