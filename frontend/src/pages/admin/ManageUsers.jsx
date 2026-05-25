import React, {
  useEffect,
  useState,
} from "react";

import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

import API from "../../services/api";

const ManageUsers = () => {

  const [users, setUsers] =
    useState([]);

  const fetchUsers =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await API.get(
            "/auth/users",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        setUsers(
          res.data
        );

      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Box p={4}>
      <Typography
        variant="h4"
        mb={4}
      >
        Manage Users
      </Typography>

      <Grid
        container
        spacing={3}
      >
        {users.map(
          (user) => (
            <Grid
              item
              xs={12}
              md={4}
              key={user.id}
            >
              <Card>
                <CardContent>

                  <Typography variant="h6">
                    {user.name}
                  </Typography>

                  <Typography>
                    {user.email}
                  </Typography>

                  <Typography>
                    {user.role}
                  </Typography>

                  <Typography>
                    {user.address}
                  </Typography>

                </CardContent>
              </Card>
            </Grid>
          )
        )}
      </Grid>
    </Box>
  );
};

export default ManageUsers;