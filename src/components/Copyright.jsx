import React, { memo } from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useTranslation } from "react-i18next";
export const Copyright = memo((props) => {
  const { t } = useTranslation();
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {t("copyright")}
      <Link color="inherit" href="https://mui.com/">
        Metro-Up
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
});
