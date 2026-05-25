import React, {
  useState,
} from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

import {
  useNavigate,
} from "react-router-dom";

import API from "../../services/api";

const CreateStore = () => {

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      address: "",
      owner_id: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        const token =
          localStorage.getItem(
            "token"
          );

        await API.post(
          "/stores/add",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert(
          "Store Added Successfully"
        );

        navigate(
          "/admin/stores"
        );

      } catch (error) {
        console.log(error);
      }
    };

  return (
    <Box
      display="flex"
      justifyContent="center"
      mt={5}
    >
      <Card
        sx={{
          width: 500,
          p: 2,
        }}
      >
        <CardContent>

          <Typography
            variant="h4"
            mb={3}
          >
            Create Store
          </Typography>

          <form
            onSubmit={
              handleSubmit
            }
          >

            <TextField
              fullWidth
              label="Store Name"
              name="name"
              margin="normal"
              onChange={
                handleChange
              }
            />

            <TextField
              fullWidth
              label="Store Email"
              name="email"
              margin="normal"
              onChange={
                handleChange
              }
            />

            <TextField
              fullWidth
              label="Address"
              name="address"
              margin="normal"
              onChange={
                handleChange
              }
            />

            <TextField
              fullWidth
              label="Owner ID"
              name="owner_id"
              margin="normal"
              onChange={
                handleChange
              }
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ mt: 3 }}
            >
              Add Store
            </Button>

          </form>

        </CardContent>
      </Card>
    </Box>
  );
};

export default CreateStore;