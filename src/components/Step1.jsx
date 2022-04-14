import React, { useState, memo } from "react";
import { Typography } from "@mui/material";
import { Paper } from "@mui/material";
import { Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import { TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDebounce } from "../hooks";
import { Api, API_URL } from "../Api";

import { makeStyles } from "@mui/styles";

export const Step1 = memo(({ state, dispatch }) => {
  const styles = useStyles();
  const [brandname, setBrandname] = useState(state.brandname);
  const [previewSource, setPreviewSource] = useState(() => {
    if (state.id) {
      return state.brandlogo;
    }
    if (state.brandlogo) {
      return URL.createObjectURL(state.brandlogo);
    }
    return null;
  });
  useDebounce(createCampaign, 3000, [brandname, state.brandlogo]);
  
  const onImageChange = ({ target: { files } }) => {
    setPreviewSource(URL.createObjectURL(files[0]));
    dispatch({ type: "brandlogo", payload: files[0] });
  };
  const removeImage = () => {
    setPreviewSource(null);
  };
  const onChangeBrandName = ({ target: { value } }) => {
    setBrandname(value);
  };
  function createCampaign() {
    if (state.brandlogo && brandname !== "" && !state.id) {
      const formData = new FormData();
      formData.append("brandlogo", state.brandlogo);
      formData.append("brandname", brandname);
      Api.post("/campaign", formData)
        .then(({ data }) => {
          dispatch({ type: "create_campaign", payload: data });
        })
        .catch((error) => {});
    }
  }
  return (
    <>
      <Typography variant="h5" sx={{ p: 2 }}>
        Create brand profile
      </Typography>
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="contained-button-file"
        multiple
        type="file"
        onChange={onImageChange}
      />

      <Paper sx={{ m: 2 }}>
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
              style={{ width: 200, height: 240, objectFit: "cover" }}
            />
          ) : (
            <>
              <IconButton
                color="secondary"
                aria-label="upload brand profile"
                component="span"
              >
                <label htmlFor="contained-button-file">
                  <AddIcon />
                </label>
              </IconButton>
              <Typography>BRAND LOGO</Typography>
            </>
          )}
          <IconButton
            disabled={!previewSource}
            color="secondary"
            aria-label="upload brand profile"
            component="span"
            onClick={removeImage}
            style={{ position: "absolute", top: 0, left: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Paper>

      <TextField
        id="brandname"
        color="secondary"
        value={brandname}
        label="Brand name"
        variant="filled"
        onChange={onChangeBrandName}
      />
    </>
  );
});
const useStyles = makeStyles({
  inputBox: {
    width: 200,
    height: 240,
    backgroundColor: "rgb(242,242,242)",
    margin: 4,
    borderRadius: 5,
  },
});
