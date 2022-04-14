import { Container } from "@mui/material";
import React, { useState, useReducer, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { CampaignType } from "../components/CampaignType";
import {
  Toolbar,
  Grid,
  AppBar,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { Preview } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { useNavigate, useLocation } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Step1 } from "../components/Step1";
import { Step2 } from "../components/Step2";
import { Step3 } from "../components/Step3";
import { Step4 } from "../components/Step4";
import { Step5 } from "../components/Step5";
import { SERVER_URL } from "../Api";
import { PreviewCampaign } from "../components/PreviewCampaign";

const initialState = {
  id: null,
  brandname: "",
  brandlogo: null,
  coverimage: null,
  objectives: [],
  categories: [],
  expectation: "",
  title: "",
  content: "",
  callaction: "",
  about: "",
  getproduct: "",
  todo: [{ index: 0, message: "" }],
  notTodo: [{ index: 0, message: "" }],
  instagram: { submission: [], hashtags: [], mentions: [] },
  facebook: { hashtags: [], urls: [], mentions: [] },
  twitter: { hashtags: [], urls: [], mentions: [] },
  images: [
    { source: null, file: null },
    { source: null, file: null },
    { source: null, file: null },
    { source: null, file: null },
    { source: null, file: null },
    { source: null, file: null },
  ],
  budget: 0,
  estimateBudget: 0,
  creator: {
    followers: [3000, 4000],
    age: [18, 40],
    gender: "All",
    location: [],
  },
  audience: {
    age: "All",
    gender: "All",
    location: [],
  },
  startdate: null,
  duration: 45,
};

function reducer(state, action) {
  switch (action.type) {
    case "brandname":
      return { ...state, brandname: action.payload };
    case "brandlogo":
      return { ...state, brandlogo: action.payload };
    case "coverimage":
      return { ...state, coverimage: action.payload };
    case "objectives":
      return { ...state, objectives: action.payload };
    case "expectation":
      return { ...state, expectation: action.payload };
    case "title":
      return { ...state, title: action.payload };
    case "callaction":
      return { ...state, callaction: action.payload };
    case "about":
      return { ...state, about: action.payload };
    case "getproduct":
      return { ...state, getproduct: action.payload };
    case "categories":
      return { ...state, categories: action.payload };
    case "todo":
      return { ...state, todo: action.payload };
    case "nottodo":
      return { ...state, notTodo: action.payload };
    case "instagram":
      return { ...state, instagram: action.payload };
    case "facebook":
      return { ...state, facebook: action.payload };
    case "twitter":
      return { ...state, twitter: action.payload };
    case "images":
      return { ...state, images: action.payload };
    case "budget":
      return { ...state, budget: action.payload };
    case "estimateBudget":
      return { ...state, estimateBudget: action.payload };
    case "creator":
      return { ...state, creator: action.payload };
    case "audience":
      return { ...state, audience: action.payload };
    case "content":
      return { ...state, content: action.payload };
    case "startdate":
      return { ...state, startdate: action.payload };
    case "duration":
      return { ...state, duration: action.payload };
    case "create_campaign":
      return {
        ...state,
        brandlogo: `${SERVER_URL}/${action.payload.brandlogo}`,
        brandname: action.payload.brandname,
        id: action.payload.id,
      };
    case "set_campaign":
      return action.payload;
    default:
      throw new Error();
  }
}

const steps = ["brand", "campaign", "brief", "budget", "submit"];

export default function CreateCampaignPage() {
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [preview, setPreview] = useState(false);
  const [state, dispatch] = useReducer(
    reducer,
    location.state ? location.state.item : initialState
  );
  const [type, setType] = useState(() => {
    if (location.state) {
      if (location.state.type) {
        return location.state.type;
      }
    }
    return null;
  });
  const styles = useStyles();
  const navigate = useNavigate();

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };
  const onClosePreview = () => {
    setPreview(false);
  };
  const openPreview = () => {
    setPreview(true);
  };
  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const closeCreate = () => {
    navigate(-1);
  };

  const getBtnState = () => {
    if (activeStep === 0 && (state.brandname === "" || !state.brandlogo)) {
      return true;
    }
    return false;
  };

  const getStep = () => {
    switch (activeStep) {
      case 0:
        return <Step1 state={state} dispatch={dispatch} />;
      case 1:
        return <Step2 state={state} dispatch={dispatch} />;
      case 2:
        return <Step3 state={state} dispatch={dispatch} />;
      case 3:
        return <Step4 state={state} dispatch={dispatch} />;
      case 4:
        return <Step5 state={state} dispatch={dispatch} />;
      default:
        return null;
    }
  };
  console.log(state);
  return (
    <>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            <img src="logo.png" style={{ height: 30 }} />
          </Typography>
          <Box
            sx={{
              ml: 2,
              mr: 4,
              flex: 1,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {type && (
              <>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Stepper activeStep={activeStep} className={styles.root}>
                  {steps.map((label, index) => {
                    return (
                      <Step color="secondary" key={label}>
                        <StepLabel color="secondary">{label}</StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>
                <IconButton onClick={openPreview}>
                  <Preview />
                </IconButton>
                <Button
                  disabled={getBtnState() || activeStep >= steps.length - 1}
                  onClick={handleNext}
                  color="secondary"
                  variant="contained"
                >
                  Next
                </Button>
              </>
            )}
          </Box>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="close"
            onClick={closeCreate}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Box style={{ backgroundColor: "rgb(242,242,242)", minHeight: "100vh" }}>
        <Container
          style={{
            backgroundColor: "rgb(242,242,242)",
            padding: 10,
            borderRadius: 5,
          }}
        >
          {!type ? (
            <CampaignType setType={setType} />
          ) : (
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              style={{ minHeight: "100vh", position: "relative" }}
            >
              <Box
                style={{
                  display: "flex",
                  position: "fixed",
                  flexDirection: "row",
                  pt: 2,
                  justifyContent: "space-between",
                  width: "140vh",
                  backgroundColor: "rgb(242,242,242)",
                }}
              ></Box>
              <Toolbar />
              {getStep()}
            </Grid>
          )}
          <PreviewCampaign
            preview={preview}
            campaign={state}
            onClosePreview={onClosePreview}
          />
        </Container>
      </Box>
    </>
  );
}

const useStyles = makeStyles({
  root: {
    minWidth: "80%",
    "& .Mui-completed": { color: "#7b1fa2" },
    "& .Mui-active": { color: "#9c27b0" },
    "& .MuiStepIcon-completed": { color: "green" },
    "& .Mui-disabled .MuiStepIcon-root": { color: "#e1bee7" },
  },
});
