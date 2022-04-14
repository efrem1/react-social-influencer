import React, { useState, memo } from "react";
import { Paper, Typography, Box, Stack, Grid } from "@mui/material";
import { RowInput } from "./RowInput";
import { DynamicList } from "./DynamicList";
import { AddSocialButton } from "./AddSocialButton";
import { InstagramForm } from "./InstagramForm";
import { FacebookForm } from "./FacebookForm";
import { TwitterForm } from "./TwitterForm";

import { PreviewImage } from "./PreviewImage";
export const Step3 = memo(({ state, dispatch }) => {
  const [instagram, setInstagram] = useState(
    state.instagram.submission.length > 0 ||
      state.instagram.hashtags.length > 0 ||
      state.instagram.mentions.length >0
  );
  const [facebook, setFacebook] = useState(() => {
    const {
      facebook: { urls, hashtags, mentions },
    } = state;
    if (hashtags.length > 0 || mentions.length > 0 || urls.length > 0) {
      return true;
    }
    return false;
  });
  const [twitter, setTwitter] = useState(() => {
    const {
      twitter: { urls, hashtags, mentions },
    } = state;
    if (hashtags.length > 0 || mentions.length > 0 || urls.length > 0) {
      return true;
    }
    return false;
  });
  const addImage = (file, index) => {
    const temp = state.images;
    temp[index].source = file; //URL.createObjectURL(file);
    temp[index].file = file;
    dispatch({ type: "images", payload: temp });
  };
  const removeImage = (index) => {
    return () => {
      const temp = state.images;
      temp[index].source = null;
      temp[index].file = null;
      dispatch({ type: "images", payload: temp });
    };
  };
  const getVisualImage = () => {
    return state.images.map((item, index) => {
      return (
        <PreviewImage
          index={index}
          id={state.id}
          item={item}
          addImage={(file) => addImage(file, index)}
          removeImage={removeImage(index)}
        />
      );
    });
  };

  const onChangeText = (value, name) => {
    dispatch({ type: name, payload: value });
  };
  const onChangeList = (list, name) => {
    dispatch({ type: name, payload: list });
  };

  const getAddSocialNetwork = () => {
    if (!facebook || !instagram || !twitter) {
      return (
        <Paper style={{ padding: 10 }}>
          <Typography variant="h6">Social media channels</Typography>
          <Typography>
            Select where you want influencers to publish their post for your
            campaign. Please make sure to add all required hashtags and handles.
          </Typography>
          <Stack>
            {!instagram && (
              <AddSocialButton
                name="Instagram"
                onClick={() => setInstagram(true)}
              />
            )}
            {!facebook && (
              <AddSocialButton
                name="Facebook"
                onClick={() => setFacebook(true)}
              />
            )}
            {!twitter && (
              <AddSocialButton
                name="Twitter"
                onClick={() => setTwitter(true)}
              />
            )}
          </Stack>
        </Paper>
      );
    }
    return null;
  };
  return (
    <Box sx={{ width: "80%" }}>
      <Stack spacing={2}>
        <Paper
          style={{
            padding: 10,
            minHeight: "70vh",
          }}
        >
          <Typography variant="h6" style={{ padding: 5 }}>
            Visual Direction
          </Typography>
          <Typography>
            Your moodboard helps creators understand the visual style you’re
            looking for. It has more influence over the quality of your
            submissions than any other part of your brief. Refer to ‘How to nail
            your moodboard’ for guidance.
          </Typography>
          <div>
            <Grid container spacing={2} sx={{ m: 2 }}>
              {getVisualImage()}
            </Grid>
          </div>
        </Paper>
        <Paper style={{ padding: 10 }}>
          <Typography variant="h6">Content we'd love from you</Typography>
          <RowInput
            title="This text will appear underneath your moodboard, so use it to describe the style of content you’re hoping for. Plus any specific direction required for the caption."
            label="Describe the style you're looking for"
            onChangeText={onChangeText}
            value={state.content}
            name="content"
          />
          <Typography variant="h6">DO'S</Typography>
          <DynamicList
            list={state.todo}
            name="todo"
            onChange={onChangeList}
            placeholder="Add a note like 'post at time your engagement is highest'"
          />
          <Typography variant="h6">DON'TS</Typography>
          <DynamicList
            list={state.notTodo}
            name="nottodo"
            onChange={onChangeList}
            placeholder="Add a note like don't submit photos you haven't captured yourself"
          />
        </Paper>
        {instagram && (
          <InstagramForm
            instagram={state.instagram}
            dispatch={dispatch}
            onClose={() => setInstagram(false)}
          />
        )}
        {facebook && (
          <FacebookForm
            facebook={state.facebook}
            dispatch={dispatch}
            onClose={() => setFacebook(false)}
          />
        )}
        {twitter && (
          <TwitterForm
            twitter={state.twitter}
            dispatch={dispatch}
            onClose={() => setTwitter(false)}
          />
        )}
        {getAddSocialNetwork()}
      </Stack>
    </Box>
  );
});
