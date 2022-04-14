import React from "react";
import Box from "@mui/material/Box";
import { Drawer, ListItem } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { BrandNavBar } from "../components/BrandNavBar";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../hooks/useQuery";
import { makeStyles } from "@mui/styles";

const drawerWidth = 240;

const settings = {
  title: "settings",
  links: ["categories"],
};

const content_library = {
  title: "contentLibrary",
  links: ["discover", "licenseRequests", "licensed"],
};

const brand_fans = {
  title: "brandFans",
  links: ["allCreators", "brandFans", "groups"],
};

export default function AdminLayout({ children, drawer = false }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const query = useQuery();
  const status = query.get("status");
  const handleNavigate = (route) => {
    navigate(route);
  };
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "rgb(242,242,242)",
        minHeight: "100vh",
      }}
    >
      <CssBaseline />
      <BrandNavBar createCampaign={false} />

      {drawer && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <ListItemButton component="div" selected>
              <ListItemText
                primary={t(`AdminDashboard.${settings.title}`).toUpperCase()}
              />
            </ListItemButton>
            {settings.links.map((item) => {
              let selected = status === item ? true : false;
              return (
                <ListItemButton
                  key={item}
                  sx={{
                    pl: 4,
                    backgroundColor: selected ? "#9c27b0" : "white",
                    color: selected ? "white" : "black",
                  }}
                  onClick={() => handleNavigate(`/admin?page=${item}`)}
                >
                  <ListItemText
                    primary={t(`AdminDashboard.${item}`)}
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: "medium",
                    }}
                  />
                </ListItemButton>
              );
            })}
            <ListItemButton>
              <ListItemText
                primary={t(
                  `BrandDashboard.${content_library.title}`
                ).toUpperCase()}
              />
            </ListItemButton>
            <List component="div" disablePadding>
              {content_library.links.map((item) => {
                let selected = status === item ? true : false;
                return (
                  <ListItemButton
                    key={item}
                    sx={{
                      pl: 4,
                      backgroundColor: selected ? "#9c27b0" : "white",
                      color: selected ? "white" : "black",
                    }}
                    onClick={() =>
                      handleNavigate(`/content-library?status=${item}`)
                    }
                  >
                    <ListItemText
                      primary={t(`BrandDashboard.${item}`)}
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: "medium",
                      }}
                    />
                  </ListItemButton>
                );
              })}
            </List>
            <ListItemButton>
              <ListItemText
                primary={t(`BrandDashboard.${brand_fans.title}`).toUpperCase()}
              />
            </ListItemButton>
            <List component="div" disablePadding>
              {brand_fans.links.map((item) => {
                let selected = status === item ? true : false;
                return (
                  <ListItemButton
                    key={item}
                    sx={{
                      pl: 4,
                      backgroundColor: selected ? "#9c27b0" : "white",
                      color: selected ? "white" : "black",
                    }}
                    onClick={() => handleNavigate(`/creator?status=${item}`)}
                  >
                    <ListItemText
                      primary={t(`BrandDashboard.${item}`)}
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: "medium",
                      }}
                    />
                  </ListItemButton>
                );
              })}
            </List>
          </Box>
        </Drawer>
      )}

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
