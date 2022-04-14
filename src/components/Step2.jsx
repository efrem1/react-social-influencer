import React, { useState, memo, useEffect } from "react";
import {
  Paper,
  Typography,
  Box,
  Stack,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  IconButton,
  Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { makeStyles } from "@mui/styles";
import { RowInput } from "./RowInput";
import { Api, SERVER_URL, API_URL } from "../Api";
import { useTranslation } from "react-i18next";

const objectives = [
  "I'm launching a new product or service",
  "I'm promoting/activating an event",
  "I'm aiming to drive awareness about my product or service",
  "I'm sourcing content to use in my own channels",
  "I'm amplifying a marketing campaign that's running through other channels (e.g. outdoor, social, tv)",
  "I'm trialling influencer marketing/Mark-Up",
  "Other",
];

const getProduct = [
  {
    title: "Send a discount code",
    description:
      "If selected, you'll receive a <100%> discount code for <the product> via <link>.",
  },
  {
    title: "Ship product",
    description:
      "If selected, you'll have <the product> shipped to you directly.",
  },
  {
    title: "Reimburse creator",
    description:
      "If selected, please purchase <the product> from <online or physical store>. Be sure to add <$25> to your fee to cover the retail cost.",
  },
  {
    title: "Other",
    description: "",
  },
];
export const Step2 = memo(({ state, dispatch }) => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [previewSource, setPreviewSource] = useState(() => {
    if (state.coverimage) {
      return state.coverimage;
    }
    return null;
  });
  const src = () => state.brandlogo;
  const styles = useStyles();
  useEffect(() => {
    fetch(`${API_URL}/categories`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    })
      .then((res) => res.json())
      .then((_categories) => {
        console.log(_categories);
        setCategories(
          _categories.map((item, index) => ({
            id: item.id,
            title: t(`categories.${item.key}`),
          }))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const onChangeObjective = ({ target: { name } }) => {
    const temp = state.objectives;
    if (temp.includes(objectives[name])) {
      var index = temp.indexOf(objectives[name]);
      temp.splice(index, 1);
      dispatch({ type: "objectives", payload: temp });
    } else {
      temp.push(objectives[name]);
      dispatch({ type: "objectives", payload: temp });
    }
  };
  const onChangeText = (value, name) => {
    dispatch({ type: name, payload: value });
  };
  const onImageChange = ({ target: { files } }) => {
    setPreviewSource(URL.createObjectURL(files[0]));
    const formData = new FormData();
    formData.append("coverimage", files[0]);
    formData.append("id", state.id);
    Api.put("/cupdatecoverimage", formData)
      .then(({ data }) => {
        console.log("------>", data);
        dispatch({
          type: "coverimage",
          payload: `${SERVER_URL}/${data.coverImage}`,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onClickChip = (categoryId) => {
    return () => {
      const temp = state.categories;
      if (temp.includes(categoryId)) {
        var index = temp.indexOf(categoryId);
        temp.splice(index, 1);
      } else {
        temp.push(categoryId);
      }
      dispatch({ type: "categories", payload: temp });
    };
  };
  return (
    <Box sx={{ width: "80%" }}>
      <Stack spacing={2}>
        <Paper
          style={{
            padding: 10,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <img
            src={src()}
            style={{ width: 60, height: 80, objectFit: "cover" }}
          />
          <Typography variant="h5" style={{ padding: 5 }}>
            {state.brandname}
          </Typography>
        </Paper>
        <Paper style={{ padding: 10, minHeight: "50vh" }}>
          <Typography variant="h6">Campaign Objectives</Typography>
          <Typography variant="h7">What is your campaign objective?</Typography>
          <Typography></Typography>
          <FormControl
            required
            //error={error}
            component="fieldset"
            sx={{ m: 3 }}
            variant="standard"
          >
            <FormLabel color="secondary" component="legend">
              You can select multiple
            </FormLabel>
            <FormGroup>
              {objectives.map((objective, index) => {
                return (
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="secondary"
                        checked={state.objectives.includes(objectives[index])}
                        onChange={onChangeObjective}
                        name={index}
                      />
                    }
                    label={objective}
                  />
                );
              })}
            </FormGroup>
          </FormControl>
          <RowInput
            title="What does campaign success look like to you?"
            label="If you like, share a specific objective or target"
            onChangeText={onChangeText}
            value={state.expectation}
            name="expectation"
          />
        </Paper>
        <Paper style={{ padding: 10 }}>
          <RowInput
            title="Campaign title"
            label="Give your new campaign a name"
            value={state.title}
            onChangeText={onChangeText}
            name="title"
          />
        </Paper>
        <Paper style={{ padding: 10 }}>
          <Typography variant="h5">Cover Image</Typography>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            position="relative"
            className={styles.inputBox}
          >
            {previewSource ? (
              <img
                src={previewSource}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <>
                <IconButton
                  color="secondary"
                  aria-label="upload brand profile"
                  component="span"
                >
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="brand-cover-image"
                    multiple
                    type="file"
                    onChange={onImageChange}
                  />
                  <label htmlFor="brand-cover-image">
                    <AddIcon />
                  </label>
                </IconButton>
                <Typography>BRAND LOGO</Typography>
              </>
            )}
          </Box>
        </Paper>
        <Paper style={{ padding: 10 }}>
          <Typography variant="h6">Call to action</Typography>
          <RowInput
            title="Summarise the type of content you want submitted in a short call to action."
            label="Submits posts 'promoting healthly eating' or Submit posts of you and our product"
            onChangeText={onChangeText}
            value={state.callaction}
            name="callaction"
          />
        </Paper>
        <Paper style={{ padding: 10 }}>
          <Typography variant="h6">
            How to get your product to Creators
          </Typography>

          <RowInput
            title="After shortlisting your favourite Creators, they may need your product to shoot their final submission. Select from the most common ways to achieve this below. Remember to replace any text in brackets with your details!"
            label="Leave this section blank if not relevant"
            onChangeText={onChangeText}
            suggestions={getProduct}
            total={300}
            value={state.getproduct}
            name="getproduct"
          />
        </Paper>
        <Paper style={{ padding: 10 }}>
          <Typography variant="h6">About you</Typography>
          <RowInput
            title="Set the stage. Give creators some colour around your product or brand and what you want to be known for."
            label="The shorter this is, the more likely creators read it"
            onChangeText={onChangeText}
            value={state.about}
            name="about"
          />
        </Paper>
        <Paper style={{ padding: 10 }}>
          <Typography variant="h6">Category</Typography>
          {categories.map((category) => {
            console.log(state.categories);
            return (
              <Chip
                sx={{ m: 1 }}
                label={category.title}
                onClick={onClickChip(category.id)}
                color={
                  state.categories.includes(category.id)
                    ? "secondary"
                    : "primary"
                }
              />
            );
          })}
        </Paper>
      </Stack>
    </Box>
  );
});

const useStyles = makeStyles({
  inputBox: {
    width: "98%",
    height: 400,
    backgroundColor: "rgb(242,242,242)",
    margin: 4,
    borderRadius: 5,
  },
});
