import { AppBar, Container, Toolbar } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import React, { memo } from "react";
import { useAuth } from "../auth";
const settings = ["My account", "Billing", "Logout"];

export const BrandNavBar = memo(({ createCampaign = true }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, tokens, setUser, setTokens } = useAuth();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
    if (setting === "Logout") {
      setTokens({});
      setUser({});
    } else if (setting === "My account") {
      navigate("/myaccount");
    } else if (setting === "Billing") {
      navigate("/billing");
    }
  };
  const openRoute = (route) => {
    return () => {
      navigate(route);
    };
  };
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            onClick={openRoute("/")}
          >
            <img src="logo.png" style={{ height: 30 }} />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
          <Box sx={{ flexGrow: 0.1, display: { md: "flex" } }}>
            {createCampaign && (
              <Button
                color="secondary"
                size="large"
                variant="contained"
                onClick={openRoute("/create-campaign")}
              >
                Create Campaign
              </Button>
            )}
          </Box>
          {Object.keys(tokens).length > 0 ? (
            <Box>
              <Tooltip title={user.firstName + " " + user.lastName}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={user.firstName}
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleCloseUserMenu(setting)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <>
              <Button
                color="secondary"
                size="large"
                variant="contained"
                onClick={openRoute("/signin")}
              >
                {t("login")}
              </Button>
              <Button
                color="secondary"
                size="large"
                variant="contained"
                onClick={openRoute("/signup")}
              >
                {t("register")}
              </Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
});
