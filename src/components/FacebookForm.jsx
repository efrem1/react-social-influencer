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
import { Facebook, Delete } from "@mui/icons-material";
import { hashtagRegex, urlRegex, handleRegex } from "../utils";

export class FacebookForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hashtag: "",
      url: "",
      handle: "",
    };
  }
  onSubmitHashtag = (event) => {
    event.preventDefault();
    const { hashtag } = this.state;
    const { facebook, dispatch } = this.props;
    if (hashtagRegex.test(hashtag)) {
      const temp = facebook.hashtags;
      temp.push(hashtag);
      dispatch({
        type: "facebook",
        payload: { ...facebook, hashtags: temp },
      });
      this.setState({ hashtag: "" });
    }
  };
  onSubmitHandle = (event) => {
    event.preventDefault();
    const { handle } = this.state;
    const { facebook, dispatch } = this.props;
    if (handleRegex.test(handle)) {
      const temp = facebook.mentions;
      temp.push(handle);
      dispatch({
        type: "facebook",
        payload: { ...facebook, mentions: temp },
      });
      this.setState({ handle: "" });
    }
  };
  onSubmitUrl = (event) => {
    event.preventDefault();
    const { url } = this.state;
    const { facebook, dispatch } = this.props;
    if (urlRegex.test(url)) {
      const temp = facebook.urls;
      temp.push(url);
      dispatch({
        type: "facebook",
        payload: { ...facebook, urls: temp },
      });
      this.setState({ url: "" });
    }
  };
  onChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };
  onClickClose = () => {
    const { dispatch } = this.props;
    dispatch({
      type: "facebook",
      payload: { hashtags: [], mentions: [], urls: [] },
    });
    this.props.close();
  };
  render() {
    const { facebook } = this.props;
    const { hashtag, url, handle } = this.state;
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
            <Facebook />
            <Typography>Facebook</Typography>
          </Box>
          <IconButton onClick={this.onClickClose}>
            <Delete />
          </IconButton>
        </Box>
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
        {facebook.hashtags.map((tag) => {
          return <Chip sx={{ m: 1 }} label={tag} color="secondary" />;
        })}
        <Box
          component="form"
          noValidate
          onSubmit={this.onSubmitHandle}
          sx={{ mt: 1 }}
        >
          <Typography>
            Enter your Facebook @handles for paid Partnership so creators can
            tag you , You will need to turn off require aproval
          </Typography>
          <FormControl fullWidth>
            <TextField
              color="secondary"
              fullWidth
              onChange={this.onChange}
              value={handle}
              name="handle"
              placeholder="Enter your Facebook @handles"
            />
          </FormControl>
        </Box>
        {facebook.mentions.map((tag) => {
          return <Chip sx={{ m: 1 }} label={tag} color="secondary" />;
        })}
        <Box
          component="form"
          noValidate
          onSubmit={this.onSubmitUrl}
          sx={{ mt: 1 }}
        >
          <Typography>
            This lets creators know what to submit to your campaign
          </Typography>
          <Typography>Add external urls</Typography>
          <FormControl fullWidth>
            <TextField
              color="secondary"
              fullWidth
              name="url"
              value={url}
              autoFocus
              onChange={this.onChange}
              placeholder="# Tags and @handles will be featured within the caption or story"
            />
          </FormControl>
        </Box>
        {facebook.urls.map((tag) => {
          return <Chip sx={{ m: 1 }} label={tag} color="secondary" />;
        })}
      </Paper>
    );
  }
}
