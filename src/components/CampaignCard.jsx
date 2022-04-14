import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CardMedia,
  Card,
  CardContent,
  Typography,
  IconButton,
  CardHeader,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  CardActions,
} from "@mui/material";
import { SERVER_URL, API_URL } from "../Api";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { PreviewCampaign } from "./PreviewCampaign";

const options = ["Preview", "Edit", "Delete"];

export const CampaignCard = memo(({ item, removeItem }) => {
  const navigate = useNavigate();

  const [anchorOptions, setAnchorOptions] = useState(null);
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(false);
  const onClosePreview = () => {
    setPreview(false);
  };
  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = (action) => {
    setOpen(false);
    if (action) {
      fetch(`${API_URL}/campaign`, {
        method: "DELETE",
        headers: {
          "Access-Control-Allow-Origin": "*",
          Accept: "application/json",
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify({ id: item.id }),
      })
        .then((res) => res.json())
        .then(() => {
          removeItem(item.id);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const handleOpenOptionsMenu = ({ currentTarget }) => {
    setAnchorOptions(currentTarget);
  };
  const handleCloseOptionsMenu = (option) => {
    setAnchorOptions(null);
    switch (option) {
      case "Edit":
        openEditCampaign();
        break;
      case "Delete":
        openDialog();
        break;
      case "Preview":
        setPreview(true);
        break;
      default:
        return;
    }
  };
  var _instagram = item.socialmedia.filter((s) => s.name === "instagram");
  var _facebook = item.socialmedia.filter((s) => s.name === "facebook");
  var _twitter = item.socialmedia.filter((s) => s.name === "twitter");
  const hasFacebook = _facebook.length > 0 ? true : false;
  const hasInstagram = _instagram.length > 0 ? true : false;
  const hasTwitter = _twitter.length > 0 ? true : false;
  var instagram = {
    mentions: [],
    hashtags: [],
    submission: [],
  };
  var facebook = { hashtags: [], urls: [], mentions: [] };
  var twitter = { hashtags: [], urls: [], mentions: [] };
  if (hasInstagram) {
    instagram = _instagram.map((s) => ({
      mentions: JSON.parse(s.mentions),
      hashtags: JSON.parse(s.hashtags),
      submission: JSON.parse(s.submission),
    }))[0];
  }
  if (hasFacebook) {
    facebook = _facebook.map((s) => ({
      urls: JSON.parse(s.urls),
      hashtags: JSON.parse(s.hashtags),
      mentions: JSON.parse(s.mentions),
    }))[0];
  }
  if (hasTwitter) {
    twitter = _twitter.map((s) => ({
      urls: JSON.parse(s.urls),
      hashtags: JSON.parse(s.hashtags),
      mentions: JSON.parse(s.mentions),
    }))[0];
  }
  const campaign = {
    id: item.id,
    brandname: item.brandname,
    brandlogo: `${SERVER_URL}/${item.brandlogo}`,
    coverimage: item.coverImage ? `${SERVER_URL}/${item.coverImage}` : null,
    objectives: item.objectives ? JSON.parse(item.objectives) : [],
    categories: item.categories ? item.categories.map((i) => i.CategoryId) : [],
    expectation: item.expectation ? item.expectation : "",
    title: item.title ? item.title : "",
    content: item.description ? item.description : "",
    callaction: item.callAction ? item.callAction : "",
    about: item.about ? item.about : "",
    getproduct: item.getProduct ? item.getProduct : "",
    todo: item.todo ? JSON.parse(item.todo) : [{ index: 0, message: "" }],
    notTodo: item.nottodo
      ? JSON.parse(item.nottodo)
      : [{ index: 0, message: "" }],
    instagram,
    facebook,
    twitter,
    images:
      item.images.length > 0
        ? item.images.map((img) => ({
            source: `${SERVER_URL}/${img.url}`,
            file: `${SERVER_URL}/${img.url}`,
          }))
        : [
            { source: null, file: null },
            { source: null, file: null },
            { source: null, file: null },
            { source: null, file: null },
            { source: null, file: null },
            { source: null, file: null },
          ],
    budget: item.budget ? item.budget : 0,
    estimateBudget: item.estimateBudget ? item.estimateBudget : 0,
    creator: item.creator
      ? JSON.parse(item.creator)
      : {
          followers: [3000, 4000],
          age: [18, 40],
          gender: "All",
          location: [],
        },
    audience: item.audience
      ? JSON.parse(item.audience)
      : {
          age: "All",
          gender: "All",
          location: [],
        },
    startdate: item.startdate ? item.startdate : null,
    duration: item.duration ? item.duration : 45,
  };
  const openEditCampaign = () => {
    navigate("/create-campaign", {
      state: { item: campaign, type: "influencer" },
    });
  };
  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
          minHeight: 350,
          position: "relative",
          boxShadow: 3,
        }}
      >
        <CardHeader
          sx={{
            position: "absolute",
            right: 0,
            backgroundColor: "rgba(0,0,0,0.06)",
          }}
          action={
            <>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorOptions}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorOptions)}
                onClose={handleCloseOptionsMenu}
              >
                {options.map((option) => {
                  return (
                    <MenuItem
                      key={option}
                      onClick={() => handleCloseOptionsMenu(option)}
                    >
                      <Typography textAlign="center">{option}</Typography>
                    </MenuItem>
                  );
                })}
              </Menu>
              <IconButton aria-label="options" onClick={handleOpenOptionsMenu}>
                <MoreVertIcon color="primary" />
              </IconButton>
            </>
          }
        />
        <CardMedia
          component="img"
          height="200"
          image={`${SERVER_URL}/${item.brandlogo}`}
          alt="Paella dish"
        />

        <CardContent>
          <Typography>{item.brandname}</Typography>
          <Typography variant="body2" color="text.secondary">
            {item.title}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {hasFacebook && <Facebook />}
          {hasInstagram && <Instagram />}
          {hasTwitter && <Twitter />}
        </CardActions>
      </Card>
      <PreviewCampaign
        preview={preview}
        campaign={campaign}
        onClosePreview={onClosePreview}
      />
      <Dialog
        open={open}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Campaign</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this campaign
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={closeDialog}>
            NO
          </Button>
          <Button color="error" onClick={() => closeDialog(true)} autoFocus>
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});
