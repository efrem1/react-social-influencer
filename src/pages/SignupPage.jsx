import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import LoadingButton from "@mui/lab/LoadingButton";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { AuthLayout } from "../layouts/AuthLayout";
import { useTranslation } from "react-i18next";
import { countries } from "../utils";
import { useAuth } from "../auth";
import { Api, API_URL } from "../Api";
import { useNavigate, Link } from "react-router-dom";

export default function SignupPage() {
  const { t } = useTranslation();
  const { setUser, user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    companyname: "",
    phonenumber: "",
    password: "",
    country: {},
  });
  const [error, setError] = useState({
    firstname: false,
    lastname: false,
    email: false,
    companyname: false,
    phonenumber: false,
    password: false,
    country: false,
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      navigate("/signup/step2");
    }
  }, [user]);
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    var hasError = false;
    Object.keys(formData).forEach((item) => {
      if (formData[item] === "") {
        hasError = true;
        setError((prevState) => {
          return { ...prevState, [item]: true };
        });
      }
    });
    if (hasError) {
      setLoading(false);
      return;
    }

    fetch(`${API_URL}/registercompany`, {
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
        setUser(data);
        navigate("/signup/step2");
      })
      .catch((error) => {
        console.log("--------->", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const onChangeField = ({ target: { name, value } }) => {
    setFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };
  const onChangeCountry = ({ target: { name, value } }) => {
    setFormData((prevState) => {
      return { ...prevState, [name]: countries[value] };
    });
  };
  return (
    <AuthLayout>
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {t("SignupPage.title")}
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <Grid container spacing={1}>
          <Grid item sm={6}>
            <TextField
              margin="normal"
              color="secondary"
              required
              fullWidth
              error={error.firstname}
              onChange={onChangeField}
              id="firstname"
              label={t("SignupPage.fields.firstName")}
              name="firstname"
              autoComplete="name"
              autoFocus
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              margin="normal"
              required
              id="lastname"
              color="secondary"
              error={error.lastname}
              onChange={onChangeField}
              fullWidth
              label={t("SignupPage.fields.lastName")}
              name="lastname"
              autoComplete="name"
            />
          </Grid>
        </Grid>
        <TextField
          margin="normal"
          required
          fullWidth
          onChange={onChangeField}
          color="secondary"
          error={error.companyname}
          id="companyname"
          label={t("SignupPage.fields.companyName")}
          name="companyname"
          autoComplete="name"
        />
        <FormControl fullWidth>
          <InputLabel id="demo-controlled-open-select-label">
            {t("country")}
          </InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            name="country"
            color="secondary"
            error={error.country}
            // open={open}
            // onClose={handleClose}
            // onOpen={handleOpen}
            // value={age}
            label="Age"
            onChange={onChangeCountry}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {countries.map((c, index) => {
              return (
                <MenuItem value={index}>
                  <img
                    loading="lazy"
                    width="20"
                    src={`https://flagcdn.com/w20/${c.code.toLowerCase()}.png`}
                    srcSet={`https://flagcdn.com/w40/${c.code.toLowerCase()}.png 2x`}
                    alt={`Flag of ${c.label}`}
                  />
                  {c.label} ({c.code}) +{c.phone}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <TextField
          margin="normal"
          color="secondary"
          fullWidth
          name="phonenumber"
          error={error.phonenumber}
          onChange={onChangeField}
          label={t("SignupPage.fields.phoneNumber")}
          id="phonenumber"
          autoComplete="phone"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          color="secondary"
          id="email"
          error={error.email}
          onChange={onChangeField}
          label={t("email")}
          name="email"
          autoComplete="email"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          error={error.password}
          onChange={onChangeField}
          label={t("password")}
          type="password"
          color="secondary"
          id="password"
          autoComplete="current-password"
        />
        <LoadingButton
          color="secondary"
          size="large"
          type="submit"
          loading={loading}
          fullWidth
          variant="contained"
          onSubmit={handleSubmit}
          sx={{ mt: 3, mb: 2 }}
        >
          {t("SignupPage.title")}
        </LoadingButton>
        <Grid container>
          <Grid item>
            <Link to="/signin" variant="body2">
              {t("SignupPage.member")}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
}
