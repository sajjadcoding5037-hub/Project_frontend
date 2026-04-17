// src/components/LoginImage.jsx

import React from "react";
import loginImage from "../assets/login.png";

function LoginImageDisplay() {
  return (
    <div style={styles.container}>
      <img src={loginImage} alt="Login UI" style={styles.image} />
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
  },
  image: {
    maxWidth: "90%",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
};

export default LoginImageDisplay;