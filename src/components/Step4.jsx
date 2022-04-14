import React, { useState } from "react";
import {
  Paper,
  Typography,
  Box,
  Stack,
  FormControl,
  TextField,
  Slider,
} from "@mui/material";
import { Check } from "@mui/icons-material";
import { useDebounce } from "../hooks";
import { CreatorInfo } from "./CreatorInfo";
import { TargetAudience } from "./TargetAudience";

const marks = [
  {
    value: 0,
    label: "$0",
  },
  {
    value: 25,
    label: "$ 25,000",
  },
  {
    value: 50,
    label: "$ 50,000",
  },
  {
    value: 75,
    label: "$ 75,000",
  },
  {
    value: 100,
    label: "$ 100,000",
  },
];
function valuetext(value) {
  return `$ ${value}`;
}

export const Step4 = ({ state, dispatch }) => {
  const [amount, setAmount] = useState(state.budget);
  const [estimateBudget, setEstimateBudget] = useState(0);

  useDebounce(handleAmountChange, 500, [amount]);
  useDebounce(handleEstimateBudget, 500, [estimateBudget]);

  function handleAmountChange() {
    dispatch({ type: "budget", payload: amount });
  }
  function handleEstimateBudget() {
    dispatch({
      type: "estimateBudget",
      payload: 100000 * (estimateBudget / 100),
    });
  }
  const onChangeAmount = ({ target: { value } }) => {
    setAmount(value);
  };
  return (
    <Box sx={{ width: "80%" }}>
      <Stack spacing={2}>
        <Paper
          style={{
            padding: 15,
            minHeight: "50vh",
          }}
        >
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6">
              What is your estimated campaign budget?
            </Typography>
            <Typography>USD$(Ex TAX)</Typography>
          </Box>
          <FormControl fullWidth sx={{ mt: 4 }}>
            <TextField
              type="number"
              value={amount}
              onChange={onChangeAmount}
              fullWidth
              color="secondary"
              style={{ textAlign: "center" }}
              placeholder="Amount"
            />
          </FormControl>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Stack
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 15,
              }}
            >
              <Typography> + Activation fee $299</Typography>
              <Typography>Total $ {Number(amount) + 299}</Typography>
            </Stack>
            <Slider
              color="secondary"
              track={false}
              aria-labelledby="track-false-slider"
              getAriaValueText={valuetext}
              defaultValue={30}
              onChange={({ target: { value } }) => setEstimateBudget(value)}
              marks={marks}
              style={{ width: "90%" }}
            />
          </Box>

          <Stack sx={{ m: 2 }}>
            <Typography>YOUR BUDGET</Typography>
            <Typography>
              <Check fontSize="small" color="success" />
              Provides us with an estimate of how much you are looking to spend
            </Typography>
            <Typography>
              <Check fontSize="small" color="success" />
              Helps us estimate how many submissions your campaign needs
            </Typography>
            <Typography>
              <Check fontSize="small" color="success" />
              We will review your campaign and confirm this budget with you
              before going live
            </Typography>
          </Stack>
        </Paper>
        <CreatorInfo creator={state.creator} dispatch={dispatch} />
        <TargetAudience audience={state.audience} dispatch={dispatch} />
      </Stack>
    </Box>
  );
};
