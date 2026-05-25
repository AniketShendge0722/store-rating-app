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

        <Typography sx={{ mt: 1 }}>
          {store.address}
        </Typography>

        <Typography sx={{ mt: 2 }}>
          Average Rating:
          {" "}
          {store.average_rating || 0}
        </Typography>

        {/* STARS */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            mt: 2,
          }}
        >
          {[1, 2, 3, 4, 5].map(
            (num) => (
              <StarIcon
                key={num}
                onClick={() =>
                  handleRating(
                    store.id,
                    num
                  )
                }
                sx={{
                  cursor: "pointer",
                  fontSize: 35,

                  color:
                    num <=
                    Number(
                      store.average_rating
                    )
                      ? "#FFD700"
                      : "#C0C0C0",

                  transition:
                    "0.3s",

                  "&:hover": {
                    transform:
                      "scale(1.2)",
                  },
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