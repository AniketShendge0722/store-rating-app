import React, {
  useState,
} from "react";

import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";

import API from "../services/api";

import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res =
        await API.post(
          "/auth/login",
          formData
        );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "role",
        res.data.user.role
      );

      if (
        res.data.user.role ===
        "ADMIN"
      ) {
        navigate("/admin");
      } else {
        navigate("/stores");
      }
    } catch (error) {
      alert("Login Failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper
        sx={{
          p: 4,
          mt: 10,
        }}
      >
        <Typography
          variant="h4"
          mb={3}
        >
          Login
        </Typography>

        <form
          onSubmit={handleLogin}
        >
          <TextField
            fullWidth
            label="Email"
            name="email"
            margin="normal"
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            name="password"
            margin="normal"
            onChange={handleChange}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 3 }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;