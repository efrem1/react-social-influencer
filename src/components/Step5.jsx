import React, { useState } from "react";
import { TextField, Box, Stack, Button } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { useNavigate } from "react-router-dom";
import { RowInput } from "./RowInput";
import { Api, API_URL } from "../Api";
import axios from "axios";
import { useDebounce } from "../hooks";

export const Step5 = ({ state, dispatch }) => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(state.startdate);
  useDebounce(handleDateChange, 500, [startDate]);
  function handleDateChange() {
    dispatch({ type: "startdate", payload: startDate });
  }
  const onChangeText = (value, name) => {
    dispatch({ type: name, payload: value });
  };
  const createCampaign = () => {
    fetch(`${API_URL}/campaign`, {
      method: "PUT",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      body: JSON.stringify(state),
    })
      .then((res) => res.json())
      .then((data) => {
        navigate("/campaign?status=inreview");
      })
      .catch((error) => {
        console.log("-------->");
      });
  };
  return (
    <Box sx={{ width: "80%" }}>
      <Stack spacing={2}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            color="secondary"
            label="Start Date"
            value={startDate}
            onChange={(newValue) => {
              setStartDate(newValue);
            }}
            renderInput={(params) => (
              <TextField color="secondary" {...params} />
            )}
          />
        </LocalizationProvider>
        <RowInput
          label="Campaign Duration"
          onChangeText={onChangeText}
          value={state.duration}
          name="duration"
          type="number"
        />
      </Stack>
      <Button
        fullWidth
        variant="contained"
        color="secondary"
        size="large"
        onClick={createCampaign}
      >
        Create Campaign
      </Button>
    </Box>
  );
};
