import React from "react";

import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";

const AdminDashboard = () => {

  const navigate =
    useNavigate();

  return (
    <>
      <Navbar />

      <Container
        sx={{ mt: 4 }}
      >
        <Typography
          variant="h4"
          mb={4}
        >
          Admin Dashboard
        </Typography>

        <Grid
          container
          spacing={3}
        >

          <Grid
            item
            xs={12}
            md={4}
          >
            <Card>
              <CardContent>
                <Typography variant="h5">
                  Store Management
                </Typography>

                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3 }}
                  onClick={() =>
                    navigate(
                      "/admin/stores"
                    )
                  }
                >
                  Manage Stores
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
          >
            <Card>
              <CardContent>
                <Typography variant="h5">
                  User Management
                </Typography>

                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3 }}
                  onClick={() =>
                    navigate(
                      "/admin/users"
                    )
                  }
                >
                  Manage Users
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
          >
            <Card>
              <CardContent>
                <Typography variant="h5">
                  Ratings
                </Typography>

                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3 }}
                  onClick={() =>
                    navigate(
                      "/admin/ratings"
                    )
                  }
                >
                  View Ratings
                </Button>
              </CardContent>
            </Card>
          </Grid>

        </Grid>
      </Container>
    </>
  );
};

export default AdminDashboard;