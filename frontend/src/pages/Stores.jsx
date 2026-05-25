import React, {
  useEffect,
  useState,
} from "react";

import {
  Container,
  Typography,
  Grid,
} from "@mui/material";

import Navbar from "../components/Navbar";

import StoreCard from "../components/StoreCard";

import API from "../services/api";

const Stores = () => {

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

  const handleRating =
    async (
      store_id,
      rating
    ) => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        await API.post(
          "/ratings/add",
          {
            store_id,
            rating,
          },
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
    <>
      <Navbar />

      <Container
        sx={{ mt: 4 }}
      >
        <Typography
          variant="h4"
          mb={4}
        >
          Stores
        </Typography>

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
                <StoreCard
                  store={store}
                  handleRating={
                    handleRating
                  }
                />
              </Grid>
            )
          )}
        </Grid>
      </Container>
    </>
  );
};

export default Stores;