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

const Signup = () => {

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      address: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSignup =
    async (e) => {
      e.preventDefault();

      try {
        const res =
          await API.post(
            "/auth/signup",
            formData
          );

        alert(
          res.data.message
        );

        navigate("/");
      } catch (error) {
        alert(
          "Signup Failed"
        );
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
          Signup
        </Typography>

        <form
          onSubmit={
            handleSignup
          }
        >
          <TextField
            fullWidth
            label="Name"
            name="name"
            margin="normal"
            onChange={handleChange}
          />

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

          <TextField
            fullWidth
            label="Address"
            name="address"
            margin="normal"
            onChange={handleChange}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 3 }}
          >
            Signup
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Signup;