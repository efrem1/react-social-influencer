import React from "react";
import { Paper, IconButton, Box } from "@mui/material";
import { Tiktok, Delete } from "@mui/icons-material";

export const TiktokForm = () => {
  return (
    <Paper
      style={{
        padding: 10,
        minHeight: "50vh",
      }}
    >
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: 50,
        }}
      >
        <Tiktok />
        <IconButton>
          <Delete />
        </IconButton>
      </Box>
    </Paper>
  );
};
