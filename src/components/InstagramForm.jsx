import React from "react";
import {
  Paper,
  IconButton,
  Box,
  FormControl,
  TextField,
  Typography,
  Chip,
} from "@mui/material";
import { Instagram, Delete } from "@mui/icons-material";
import { hashtagRegex, handleRegex } from "../utils";

const submission = ["Posts", "Stories", "Carousels"];

export class InstagramForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSubmission: props.instagram.submission,
      hashtag: "",
      handle: "",
    };
  }

  handleAddRemove = (item) => {
    return () => {
      const { instagram, dispatch } = this.props;
      const temp = this.state.selectedSubmission;
      if (temp.includes(item)) {
        let index = temp.indexOf(item);
        temp.splice(index, 1);
      } else {
        temp.push(item);
      }
      this.setState({ selectedSubmission: temp });
      dispatch({
        type: "instagram",
        payload: { ...instagram, submission: temp },
      });
    };
  };
  onSubmitHashtag = (event) => {
    event.preventDefault();
    const { hashtag } = this.state;
    const { instagram, dispatch } = this.props;
    if (hashtagRegex.test(hashtag)) {
      const temp = instagram.hashtags;
      temp.push(hashtag);
      dispatch({
        type: "instagram",
        payload: { ...instagram, hashtags: temp },
      });
      this.setState({ hashtag: "" });
    }
  };
  onSubmitHandle = (event) => {
    event.preventDefault();
    const { handle } = this.state;
    const { instagram, dispatch } = this.props;
    if (handleRegex.test(handle)) {
      const temp = instagram.mentions;
      temp.push(handle);
      dispatch({
        type: "instagram",
        payload: { ...instagram, mentions: temp },
      });
      this.setState({ handle: "" });
    }
  };
  onChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };
  onClickClose = () => {
    const { dispatch } = this.props;
    dispatch({
      type: "instagram",
      payload: { hashtags: [], mentions: [], submission: [] },
    });
    this.props.close();
  };
  render() {
    const { instagram } = this.props;
    const { selectedSubmission, hashtag, handle } = this.state;
    return (
      <Paper
        style={{
          padding: 10,
          minHeight: "50vh",
        }}
      >
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: 50,
          }}
        >
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Instagram />
            <Typography>Instagram</Typography>
          </Box>
          <IconButton onClick={this.onClickClose}>
            <Delete />
          </IconButton>
        </Box>
        <Typography>Which submission types do you need</Typography>
        {submission.map((item) => (
          <Chip
            sx={{ m: 1 }}
            label={item}
            onClick={this.handleAddRemove(item)}
            color={selectedSubmission.includes(item) ? "secondary" : "primary"}
          />
        ))}
        <Box
          component="form"
          noValidate
          onSubmit={this.onSubmitHashtag}
          sx={{ mt: 1 }}
        >
          <Typography>
            This lets creators know what to submit to your campaign
          </Typography>
          <Typography>Add #tags @handles you want feature</Typography>
          <FormControl fullWidth>
            <TextField
              color="secondary"
              fullWidth
              name="hashtag"
              value={hashtag}
              autoFocus
              onChange={this.onChange}
              placeholder="# Tags and @handles will be featured within the caption or story"
            />
          </FormControl>
        </Box>
        {instagram.hashtags.map((tag) => {
          return <Chip sx={{ m: 1 }} label={tag} color="secondary" />;
        })}
        <Box
          component="form"
          noValidate
          onSubmit={this.onSubmitHandle}
          sx={{ mt: 1 }}
        >
          <Typography>
            Enter your Instagram @handles for paid Partnership so creators can
            tag you , You will need to turn off require aproval
          </Typography>
          <FormControl fullWidth>
            <TextField
              color="secondary"
              fullWidth
              onChange={this.onChange}
              value={handle}
              name="handle"
              placeholder="Enter your instagram @handles"
            />
          </FormControl>
        </Box>
        {instagram.mentions.map((tag) => {
          return <Chip sx={{ m: 1 }} label={tag} color="secondary" />;
        })}
      </Paper>
    );
  }
}
