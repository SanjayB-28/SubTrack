import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async () => {
    // Ensure passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setSuccess("");
      return;
    }

    try {
      // API call to register
      await axios.post("http://localhost:5000/api/auth/register", {
        email,
        password,
      });

      setError("");
      setSuccess("Registration successful! You can now log in.");
      // Clear fields after successful registration
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      // Handle errors from the API
      setError(err.response?.data?.message || "Failed to register. Please try again.");
      setSuccess("");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #2D3748, #1A202C)",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "400px",
          background: "rgba(45, 55, 72, 0.9)",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "#E2E8F0",
            marginBottom: "20px",
          }}
        >
          Register
        </Typography>
        {error && (
          <Typography
            sx={{
              color: "#E53E3E",
              fontSize: "14px",
              fontWeight: "bold",
              marginBottom: "15px",
            }}
          >
            {error}
          </Typography>
        )}
        {success && (
          <Typography
            sx={{
              color: "#38A169",
              fontSize: "14px",
              fontWeight: "bold",
              marginBottom: "15px",
            }}
          >
            {success}
          </Typography>
        )}
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            marginBottom: "15px",
            "& .MuiOutlinedInput-root": {
              background: "rgba(255, 255, 255, 0.1)",
              color: "#E2E8F0",
            },
            "& .MuiInputLabel-root": {
              color: "#A0AEC0",
            },
          }}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            marginBottom: "15px",
            "& .MuiOutlinedInput-root": {
              background: "rgba(255, 255, 255, 0.1)",
              color: "#E2E8F0",
            },
            "& .MuiInputLabel-root": {
              color: "#A0AEC0",
            },
          }}
        />
        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          variant="outlined"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{
            marginBottom: "20px",
            "& .MuiOutlinedInput-root": {
              background: "rgba(255, 255, 255, 0.1)",
              color: "#E2E8F0",
            },
            "& .MuiInputLabel-root": {
              color: "#A0AEC0",
            },
          }}
        />
        <Button
          fullWidth
          onClick={handleRegister}
          sx={{
            backgroundColor: "#2B6CB0",
            color: "#E2E8F0",
            padding: "10px",
            fontSize: "16px",
            fontWeight: "bold",
            textTransform: "capitalize",
            borderRadius: "5px",
            "&:hover": {
              backgroundColor: "#2C5282",
            },
          }}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default Register;
