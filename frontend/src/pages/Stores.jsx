import React, {
  useEffect,
  useState,
} from "react";

import {
  Container,
  Typography,
  Grid,
  TextField,
} from "@mui/material";

import Navbar from "../components/Navbar";

import StoreCard from "../components/StoreCard";

import API from "../services/api";

const Stores = () => {

  const [stores, setStores] =
    useState([]);

  const [search, setSearch] =
    useState("");



  // =========================
  // FETCH STORES
  // =========================
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



  // =========================
  // LOAD STORES
  // =========================
  useEffect(() => {
    fetchStores();
  }, []);



  // =========================
  // HANDLE RATING
  // =========================
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

        alert(
          "Rating Submitted"
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

        {/* PAGE TITLE */}
        <Typography
          variant="h4"
          mb={4}
          fontWeight="bold"
        >
          Stores
        </Typography>



        {/* SEARCH BAR */}
        <TextField
          fullWidth
          label="Search Stores By Name or Address"
          variant="outlined"
          sx={{ mb: 4 }}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />



        {/* STORE LIST */}
        <Grid
          container
          spacing={3}
        >
          {stores
            .filter(
              (store) =>
                store.name
                  .toLowerCase()
                  .includes(
                    search.toLowerCase()
                  ) ||

                store.address
                  .toLowerCase()
                  .includes(
                    search.toLowerCase()
                  )
            )
            .map((store) => (
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
            ))}
        </Grid>

      </Container>
    </>
  );
};

export default Stores;