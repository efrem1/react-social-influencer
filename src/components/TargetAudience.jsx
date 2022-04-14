import React, { useState } from "react";
import { Paper, Typography, Stack, Chip } from "@mui/material";
import { useDebounce, useArray } from "../hooks";
const genders = ["All", "Male", "Female"];
const locations = [
  "All",
  "Australia",
  "UK",
  "Europe",
  "USA & Canada",
  "Central & South America",
  "Asia",
  "Africa",
];
const ages = ["All", "13-17", "18-24", "25-34", "35-44", "45+"];
export const TargetAudience = ({ audience, dispatch }) => {
  const location = useArray(audience.location);
  const [age, setAge] = useState(audience.age);
  const [gender, setGender] = useState(audience.gender);
  useDebounce(handleAudienceChange, 500, [age, gender, location.array]);
  const handleAddRemove = (item) => {
    return () => {
      location.addRemove(item);
    };
  };
  function handleAudienceChange() {
    dispatch({
      type: "audience",
      payload: {
        age: age,
        gender: gender,
        location: location.array,
      },
    });
  }
  return (
    <Paper
      style={{
        padding: 15,
        minHeight: "30vh",
      }}
    >
      <Stack>
        <Typography variant="h6">
          Preffered age of your target audience?
        </Typography>
        <div>
          {ages.map((item) => {
            return (
              <Chip
                key={item}
                sx={{ m: 1 }}
                onClick={() => setAge(item)}
                label={item}
                color={item === age ? "secondary" : "primary"}
              />
            );
          })}
        </div>
        <Typography variant="h6">
          What gender are you hoping to reach?
        </Typography>
        <div>
          {genders.map((item) => {
            return (
              <Chip
                key={item}
                sx={{ m: 1 }}
                onClick={() => setGender(item)}
                label={item}
                color={item === gender ? "secondary" : "primary"}
              />
            );
          })}
        </div>
        <Typography variant="h6">Where does this audience live</Typography>
        <div>
          {locations.map((item) => {
            return (
              <Chip
                key={item}
                onClick={handleAddRemove(item)}
                sx={{ m: 1 }}
                label={item}
                color={location.array.includes(item) ? "secondary" : "primary"}
              />
            );
          })}
        </div>
      </Stack>
    </Paper>
  );
};
