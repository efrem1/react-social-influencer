import React, { memo } from "react";
import { Add } from "@mui/icons-material";
import { IconButton, Box, Typography } from "@mui/material";

export const AddSocialButton = memo(({ name, onClick }) => {
  return (
    <Box
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <IconButton onClick={onClick}>
        <Add color="secondary" fontSize="small" />
      </IconButton>
      <Typography>Add {name}</Typography>
    </Box>
  );
});
