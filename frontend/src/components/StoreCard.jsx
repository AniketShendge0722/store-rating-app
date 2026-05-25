import React from "react";

import {
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

import StarIcon from "@mui/icons-material/Star";

const StoreCard = ({
  store,
  handleRating,
}) => {
  return (
    <Card
      sx={{
        borderRadius: 4,
        boxShadow: 4,
      }}
    >
      <CardContent>
        <Typography variant="h5">
          {store.name}
        </Typography>

        <Typography>
          {store.address}
        </Typography>

        <Typography mt={2}>
          Average Rating:
          {" "}
          {store.average_rating || 0}
        </Typography>

        <Box
          sx={{
            display: "flex",
            mt: 2,
            gap: 1,
          }}
        >
          {[1, 2, 3, 4, 5].map(
            (star) => (
              <StarIcon
                key={star}
                onClick={() =>
                  handleRating(
                    store.id,
                    star
                  )
                }
                sx={{
                  cursor: "pointer",
                  color:
                    star <=
                    Number(
                      store.user_rating
                    )
                      ? "gold"
                      : "gray",
                }}
              />
            )
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default StoreCard;