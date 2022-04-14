import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";

export const MainLayout = (props) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <NavBar {...props} />
      <Toolbar />
      <Container>{props.children}</Container>
      <Footer />
    </React.Fragment>
  );
};
