import React, { useRef, useEffect } from "react";
import { Button, Box, Typography, Chip, IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Instagram, Check, Close } from "@mui/icons-material";
import { ImageCarousel } from "./ImageCarousel";

export function PreviewCampaign({ preview, onClosePreview, campaign }) {
  const handleClose = () => {
    onClosePreview();
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (preview) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [preview]);

  const n = {
    sx: { border: 2, borderColor: "#7b1fa2" },
  };
  return (
    <div>
      <Dialog
        open={preview}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        PaperProps={n}
      >
        <DialogTitle id="scroll-dialog-title">Preview Campaign</DialogTitle>
        <DialogContent dividers>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <div style={{ position: "relative" }}>
              <Box
                component="img"
                src={campaign.coverimage}
                sx={{ width: 500, height: 250, objectFit: "cover" }}
              />
              <Box
                component="img"
                src={campaign.brandlogo}
                sx={{
                  position: "absolute",
                  bottom: -45,
                  left: "40%",
                  width: 100,
                  height: 100,
                  objectFit: "cover",
                  borderRadius: 2,
                }}
              />
            </div>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: 500,
              }}
              sx={{ mt: 6 }}
            >
              <Typography variant="h6">
                {campaign.brandname.toUpperCase()}
              </Typography>
              <Typography>{campaign.title}</Typography>
              <Typography>{campaign.expectation}</Typography>
            </Box>
            <Box
              style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
              sx={{ p: 2, m: 1 }}
            >
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography>INFLUENCE REQUIREMENTS</Typography>
                <Typography>YOU</Typography>
              </Box>
              <Typography>{campaign.creator.gender} gender</Typography>
              <Typography>Age {campaign.creator.age.join("-")}</Typography>
              <Typography>
                {campaign.creator.followers.join("-")} followers
              </Typography>
              <Typography>
                From {campaign.creator.location.join(", ")}
              </Typography>
            </Box>
            <Box
              style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
              sx={{ p: 2, m: 1 }}
            >
              <Typography>PREFERRED AUDIENCE</Typography>
              <Typography>{campaign.audience.gender} gender</Typography>
              <Typography>Age {campaign.audience.age}</Typography>
              <Typography>{campaign.audience.location.join(", ")}</Typography>
            </Box>
            <Typography variant="h6">ABOUT US</Typography>
            <Typography>{campaign.about}</Typography>
            <Typography variant="h6">MOODBOARD</Typography>
            <ImageCarousel images={campaign.images.map((i) => i.source)} />
            <Typography variant="h6">CONTENT WE'D LOVE FROM YOU</Typography>
            <Typography>{campaign.content}</Typography>
            <Typography variant="h6">SUBMISSION OPTIONS</Typography>
            <Box>
              <IconButton>
                <Instagram />
              </IconButton>
              {campaign.instagram.submission.map((sub) => {
                return <Chip label={sub} sx={{ m: 1 }} color="secondary" />;
              })}
              <hr />
              <Typography>TAGS</Typography>
              <Typography>Instagram Paid Partnership</Typography>
              {campaign.instagram.mentions.map((men) => {
                return <Chip label={men} color="secondary" sx={{ m: 1 }} />;
              })}
              <Typography>Instagram</Typography>
              {campaign.instagram.hashtags.map((tag) => {
                return <Chip label={tag} color="secondary" sx={{ m: 1 }} />;
              })}
              <Typography>DO</Typography>
              {campaign.todo
                .filter((i) => i.message !== "")
                .map((item) => {
                  return (
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <IconButton>
                        <Check color="success" />
                      </IconButton>
                      <Typography>{item.message}</Typography>
                    </Box>
                  );
                })}
              <Typography>DON'T</Typography>
              {campaign.notTodo
                .filter((i) => i.message !== "")
                .map((item) => {
                  return (
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <IconButton>
                        <Close color="error" />
                      </IconButton>
                      <Typography>{item.message}</Typography>
                    </Box>
                  );
                })}
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
