import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { AuthLayout } from "../layouts/AuthLayout";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Api, API_URL } from "../Api";
import { useAuth } from "../auth";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const types = ["brand", "agency"];
const purpose = ["influencerMarketing", "brandedContent"];
const compaignsRange = ["1-2", "3-5 ", "6-10 ", "10+"];
const brandEmployees = ["1-10", "11-50", "51-200", "201-1000", "1000+"];

export default function RegisterBrand() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    type: "",
    purpose: "",
    campaignRange: "",
    employesRange: "",
  });
  const [error, setError] = useState({
    type: false,
    purpose: false,
    campaignRange: false,
    employesRange: false,
  });
  const [loading, setLoading] = useState(false);
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
      } else {
        setError((prevState) => {
          return { ...prevState, [item]: false };
        });
      }
    });
    if (hasError) {
      setLoading(false);
      return;
    }

    const data = {
      ...user.company,
      type: formData.type,
      purpose: formData.purpose,
      campaignRange: formData.campaignRange,
      employesRange: formData.employesRange,
    };
    
    fetch(`${API_URL}/company`, {
      method: "PUT",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        setUser({ ...user, company: { ...user.company, ...data } });
      })
      .catch((error) => {
        console.log("--------->", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const onChangeType = ({ target: { value, name } }) => {
    setFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };
  useEffect(() => {
    if (Object.keys(user).length === 0) {
      navigate("/");
    } else {
      if (user.company?.type) {
        navigate("/signin");
      }
    }
  }, [user]);

  console.log(user);

  return (
    <AuthLayout>
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {t("RegisterBrand.title")}
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit}>
        <FormControl
          color="secondary"
          fullWidth
          margin="normal"
          error={error.type}
        >
          <InputLabel id="demo-controlled-open-select-label">
            {t("iam")}
          </InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            name="type"
            label="Your"
            color="secondary"
            fullWidth
            onChange={onChangeType}
          >
            {types.map((type, index) => {
              return <MenuItem value={type}>{t(type)}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <FormControl
          color="secondary"
          fullWidth
          margin="normal"
          error={error.purpose}
        >
          <InputLabel id="demo-controlled-open-select-label">
            {t("yourPurpose")}
          </InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            name="purpose"
            label="Your purpose"
            fullWidth
            onChange={onChangeType}
          >
            {purpose.map((p) => {
              return (
                <MenuItem key={p} value={p}>
                  {t(p)}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl
          color="secondary"
          fullWidth
          margin="normal"
          error={error.campaignRange}
        >
          <InputLabel id="demo-controlled-open-select-label">
            {t("compaigns")}
          </InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            name="campaignRange"
            label="compaigns"
            fullWidth
            onChange={onChangeType}
          >
            {compaignsRange.map((p) => {
              return (
                <MenuItem key={p} value={p}>
                  {`${p} ${t("compaigns")}`}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl
          color="secondary"
          fullWidth
          margin="normal"
          error={error.employesRange}
        >
          <InputLabel id="demo-controlled-open-select-label">
            {t("employees")}
          </InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            name="employesRange"
            label="compaigns"
            fullWidth
            onChange={onChangeType}
          >
            {brandEmployees.map((p) => {
              return (
                <MenuItem key={p} value={p}>
                  {`${p} ${t("employees")}`}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <LoadingButton
          color="secondary"
          size="large"
          type="submit"
          fullWidth
          loading={loading}
          variant="contained"
          onSubmit={handleSubmit}
          sx={{ mt: 3, mb: 2 }}
        >
          {t("SignupPage.title")}
        </LoadingButton>
      </Box>
    </AuthLayout>
  );
}
