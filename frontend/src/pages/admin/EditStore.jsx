import React, {
  useEffect,
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
  useParams,
} from "react-router-dom";

import API from "../../services/api";

const EditStore = () => {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      address: "",
    });

  const fetchStore =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await API.get(
            `/stores/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        setFormData(
          res.data
        );

      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchStore();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleUpdate =
    async (e) => {
      e.preventDefault();

      try {
        const token =
          localStorage.getItem(
            "token"
          );

        await API.put(
          `/stores/${id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert(
          "Store Updated Successfully"
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
            Edit Store
          </Typography>

          <form
            onSubmit={
              handleUpdate
            }
          >

            <TextField
              fullWidth
              label="Store Name"
              name="name"
              margin="normal"
              value={
                formData.name
              }
              onChange={
                handleChange
              }
            />

            <TextField
              fullWidth
              label="Store Email"
              name="email"
              margin="normal"
              value={
                formData.email
              }
              onChange={
                handleChange
              }
            />

            <TextField
              fullWidth
              label="Address"
              name="address"
              margin="normal"
              value={
                formData.address
              }
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
              Update Store
            </Button>

          </form>

        </CardContent>
      </Card>
    </Box>
  );
};

export default EditStore;