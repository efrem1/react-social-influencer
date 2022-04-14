import { Grid, Typography } from "@mui/material";
import React, { memo, useState } from "react";
import { Button, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import influencer from "../assets/influencer.jpg";
import content from "../assets/content.jpg";

export const CampaignType = memo(({ setType }) => {
  return (
    <Grid container spacing={1} direction="row">
      <Type
        title="INFLUENCER CAMPAIGN"
        description="Creators visually celebrate your product. You then approve the
              content you love and they post it to their social feed."
        btnTitle="CREATE AN INFLUENCER CAMPAIGN"
        image={influencer}
        onClick={() => setType("influencer")}
      />
      <Type
        title="CONTENT CAMPAIGN"
        description=" Access TRIBE's Content Creators to generate branded content that you
        license for use on your own advertising channels."
        btnTitle="CREATE A CONTENT CAMPAIGN"
        image={content}
        onClick={() => setType("content")}
      />
    </Grid>
  );
});

const Type = memo(({ title, description, btnTitle, image, onClick }) => {
  const styles = useStyles();
  const [state, setState] = useState({
    raised: false,
    shadow: 1,
  });
  return (
    <Grid
      item
      sm={6}
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="space-between"
      style={{ minHeight: "80vh", padding: 10 }}
    >
      <Box
        className={state.raised ? styles.cardHovered : styles.root}
        onMouseOver={() => setState({ raised: true, shadow: 3 })}
        onMouseOut={() => setState({ raised: false, shadow: 1 })}
      >
        <img src={image} className={styles.image} />
        <div className={styles.overlay}>
          <Typography variant="h4" gutterBottom color="white">
            {title}
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              color="white"
              variant="subtitle1"
              gutterBottom
              component="div"
            >
              {description}
            </Typography>
            <Button
              color="secondary"
              size="large"
              variant="contained"
              onClick={onClick}
            >
              {btnTitle}
            </Button>
          </div>
        </div>
      </Box>
    </Grid>
  );
});

const useStyles = makeStyles({
  root: {
    display: "flex",
    minHeight: "40vh",
    minWidth: "60vh",
    position: "relative",
    borderRadius: 5,
    transition: "transform 0.10s ease-in-out",
  },
  cardHovered: {
    display: "flex",
    minHeight: "40vh",
    minWidth: "60vh",
    position: "relative",
    borderRadius: 5,
    transform: "scale3d(1.01, 1.01, 1)",
  },
  image: {
    width: "100%",
    height: "80vh",
    borderRadius: 5,
    objectFit: "cover",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 5,
  },
});
