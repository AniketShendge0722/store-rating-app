import React, {
  useEffect,
  useState,
} from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

import {
  useNavigate,
} from "react-router-dom";

import API from "../../services/api";

const AdminStores = () => {

  const navigate =
    useNavigate();

  const [stores, setStores] =
    useState([]);

  const fetchStores =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await API.get(
            "/stores",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        setStores(
          res.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchStores();
  }, []);

  const deleteStore =
    async (id) => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        await API.delete(
          `/stores/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        fetchStores();

      } catch (error) {
        console.log(error);
      }
    };

  return (
    <Box p={4}>
      <Typography
        variant="h4"
        mb={4}
      >
        Manage Stores
      </Typography>

      <Button
        variant="contained"
        sx={{ mb: 3 }}
        onClick={() =>
          navigate(
            "/admin/create-store"
          )
        }
      >
        Add Store
      </Button>

      <Grid
        container
        spacing={3}
      >
        {stores.map(
          (store) => (
            <Grid
              item
              xs={12}
              md={4}
              key={store.id}
            >
              <Card>
                <CardContent>

                  <Typography variant="h5">
                    {store.name}
                  </Typography>

                  <Typography>
                    {store.address}
                  </Typography>

                  <Typography>
                    Rating:
                    {" "}
                    {
                      store.average_rating
                    }
                  </Typography>

                  <Button
                    variant="outlined"
                    sx={{ mt: 2 }}
                    onClick={() =>
                      navigate(
                        `/admin/edit-store/${store.id}`
                      )
                    }
                  >
                    Edit
                  </Button>

                  <Button
                    color="error"
                    variant="contained"
                    sx={{
                      mt: 2,
                      ml: 2,
                    }}
                    onClick={() =>
                      deleteStore(
                        store.id
                      )
                    }
                  >
                    Delete
                  </Button>

                </CardContent>
              </Card>
            </Grid>
          )
        )}
      </Grid>
    </Box>
  );
};

export default AdminStores;