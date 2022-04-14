import React, { useState } from "react";
import {
  Paper,
  Typography,
  Stack,
  Slider,
  Chip,
} from "@mui/material";
import { useArray, useDebounce } from "../hooks";
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
export const CreatorInfo = ({ creator, dispatch }) => {
  const [followers, setFollowers] = useState(creator.followers);
  const [age, setAge] = useState(creator.age);
  const [gender, setGender] = useState(creator.gender);
  const location = useArray(creator.location);
  useDebounce(handleCreatorChange, 500, [
    followers,
    age,
    gender,
    location.array,
  ]);
  const handleChangeFollowers = (event, newValue) => {
    setFollowers(newValue);
  };
  const handleChangeAge = (event, newValue) => {
    setAge(newValue);
  };
  const handleAddRemove = (loc) => {
    return () => {
      location.addRemove(loc);
    };
  };
  function handleCreatorChange() {
    dispatch({
      type: "creator",
      payload: {
        followers: followers,
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
        minHeight: "50vh",
      }}
    >
      <Stack>
        <Typography variant="h6">
          How many followers would you like your Creators to have?
        </Typography>
        <Typography>{`${followers[0] * 3000} - ${
          followers[1] * 3000
        }`}</Typography>
        <Slider
          //getAriaLabel={() => "Temperature range"}
          value={followers}
          color="secondary"
          min={1}
          onChange={handleChangeFollowers}
          valueLabelDisplay="auto"
          getAriaValueText={(value) => value * 3000}
        />
        <Typography variant="h6">
          What age would you like your Creators to be
        </Typography>
        <Typography>{`${age[0]} - ${age[1]}`}</Typography>
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={age}
          color="secondary"
          min={15}
          onChange={handleChangeAge}
          valueLabelDisplay="auto"
          getAriaValueText={(value) => `$ ${value}`}
        />
        <Typography variant="h6">
          Preffered gender for your Creators?
        </Typography>
        <div>
          {genders.map((_gender) => {
            return (
              <Chip
                sx={{ m: 1 }}
                onClick={() => setGender(_gender)}
                label={_gender}
                color={gender === _gender ? "secondary" : "primary"}
              />
            );
          })}
        </div>
        <Typography variant="h6">
          Where would you like your Creators to be located
        </Typography>
        <div>
          {locations.map((item) => {
            return (
              <Chip
                key={item}
                sx={{ m: 1 }}
                onClick={handleAddRemove(item)}
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
