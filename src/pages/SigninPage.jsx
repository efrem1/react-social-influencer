import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { Close } from "@mui/icons-material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { AuthLayout } from "../layouts/AuthLayout";
import { useTranslation } from "react-i18next";
import { Api, API_URL } from "../Api";
import { useAuth } from "../auth";
import { useNavigate, Link } from "react-router-dom";

export default function SigninPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, setUser, setTokens, tokens } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [validation, setValidation] = useState({
    emailError: false,
    passwordError: false,
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
   
    if (Object.keys(tokens).length > 0 && Object.keys(user).length > 0) {
     
      if (tokens.accesstoken) {
      
        // if (user.company === "brand") {
       
          navigate("/campaign");
       // }
      }
    }
  }, [tokens, user]);
  const onChange = ({ target: { name, value } }) => {
    setFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setValidation({ emailError: false, passwordError: false });
    if (formData.email === "") {
      setValidation((prevState) => {
        return { ...prevState, emailError: true };
      });
      setLoading(false);
      return;
    }
    if (formData.password === "") {
      setValidation((prevState) => {
        return { ...prevState, passwordError: true };
      });
      setLoading(false);
      return;
    }
    fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
       
        if (data.hasOwnProperty("message")) {
          return;
        }
        console.log("---------->",data)
        setTokens(data.tokens);
        setUser(data.user);
      })
      .catch((error) => {
        console.log("--------->", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <AuthLayout>
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {t("SigninPage.title")}
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        {Object.keys(user).length > 0 ? (
          <div>
            <Typography
              component="h1"
              variant="h5"
            >{`Welcome back ${user.firstName} ${user.lastName}`}</Typography>
            <Close onClick={() => setUser({})} />
          </div>
        ) : (
          <TextField
            margin="normal"
            required
            error={validation.emailError}
            fullWidth
            color="secondary"
            id="email"
            label={t("email")}
            name="email"
            onChange={onChange}
            autoComplete="email"
            autoFocus
          />
        )}
        <TextField
          margin="normal"
          required
          error={validation.passwordError}
          fullWidth
          color="secondary"
          onChange={onChange}
          name="password"
          label={t("password")}
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <LoadingButton
          color="secondary"
          size="large"
          loading={loading}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {t("SigninPage.title")}
        </LoadingButton>
        <Grid container>
          <Grid item xs>
            <Link to="/forgetpassword" variant="body2">
              {t("SigninPage.links.forgotPassword")}
            </Link>
          </Grid>
          <Grid item>
            <Link to="/signup" variant="body2">
              {t("SigninPage.links.newUser")}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
}
