import React, {
  useEffect,
  useState,
} from "react";

import API from "../../services/api";

import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
} from "@mui/material";

const Ratings = () => {

  const [ratings, setRatings] =
    useState([]);

  const fetchRatings =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await API.get(
            "/ratings",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        setRatings(
          res.data
        );

      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchRatings();
  }, []);

  const deleteRating =
    async (id) => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        await API.delete(
          `/ratings/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        fetchRatings();

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
        Ratings
      </Typography>

      <Grid
        container
        spacing={3}
      >
        {ratings.map(
          (rating) => (
            <Grid
              item
              xs={12}
              md={4}
              key={rating.id}
            >
              <Card>
                <CardContent>

                  <Typography variant="h6">
                    User:
                    {" "}
                    {
                      rating.user_name
                    }
                  </Typography>

                  <Typography>
                    Store:
                    {" "}
                    {
                      rating.store_name
                    }
                  </Typography>

                  <Typography>
                    Rating:
                    {" "}
                    {
                      rating.rating
                    }
                  </Typography>

                  <Button
                    fullWidth
                    color="error"
                    variant="contained"
                    sx={{ mt: 3 }}
                    onClick={() =>
                      deleteRating(
                        rating.id
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

export default Ratings;