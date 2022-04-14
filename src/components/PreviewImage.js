import React, { memo } from "react";
import { Box, Grid, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";
import { Api, SERVER_URL } from "../Api";


export const PreviewImage = memo(({ item,id, addImage, removeImage }) => {
  const styles = useStyles();
  const onImageChange = ({ target: { files } }) => {
    // setPreviewSource({ source: URL.createObjectURL(files[0]), file: files[0] });
    const formData = new FormData();
    formData.append('campaignImage',files[0]);
    formData.append('id',id);
    Api.put('/campaignimage',formData)
    .then(({data})=>{
      console.log("--------->",data)
      addImage(`${SERVER_URL}/${data.url}`);
    })
    .catch(error=>{
      console.log(error);
    })
  };
  return (
    <Grid item xs={3.5} sx={{ p: 0 }} className={styles.imageContainer}>
      <Box
        style={{
          backgroundColor: "rgb(242,242,242)",
          display: "flex",
          height: 300,
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          borderRadius: 8,
        }}
      >
        {item.source ? (
          <img
            src={item.source}
            style={{
              width: "100%",
              height: 300,
              objectFit: "cover",
              borderRadius: 8,
            }}
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
                id="contained-button-file"
                multiple
                type="file"
                onChange={onImageChange}
              />
              <label htmlFor="contained-button-file">
                <AddIcon />
              </label>
            </IconButton>
          </>
        )}
        {item.source && (
          <IconButton
            color="secondary"
            aria-label="upload brand profile"
            component="span"
            onClick={removeImage}
            style={{ position: "absolute", top: 0, left: 0 }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </Box>
    </Grid>
  );
});
const useStyles = makeStyles({
  imageContainer: {
    //backgroundColor: "rgb(242,242,242)",
    margin: 10,
    borderRadius: 8,
    height: 300,
  },
});
