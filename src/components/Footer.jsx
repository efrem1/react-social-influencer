import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Box } from "@mui/material";
import { Link } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import { InputAdornment } from "@mui/material";
import { Accordion } from "@mui/material";
import { AccordionSummary } from "@mui/material";
import { AccordionDetails } from "@mui/material";
import { Select } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LangIcon from '@mui/icons-material/Language'

function Copyright() {
  return (
    <Typography variant="body2" display="block" color="textSecondary">
      &copy;&nbsp; Brand name
    </Typography>
  );
}

const footers = [
  {
    title: "Company",
    description: ["Team", "History", "Contact us", "Locations"],
    link: ["#team", "#history", "#contact-us", "#locations"],
  },
  {
    title: "Resources",
    description: [
      "Resource",
      "Resource name",
      "Another resource",
      "Final resource",
    ],
    link: [
      "#resource",
      "#resource-name",
      "#another-resource",
      "#final-resource",
    ],
  },
  {
    title: "Legal",
    description: ["Privacy policy", "Terms of use"],
    link: ["#privacy-policy", "#terms-of-use"],
  },
];

export function Footer(props) {
  const [ctn, setCtn] = useState(null);

  useEffect(() => {}, []);

  function handleChange(event) {}

  return (
    <Container maxWidth="lg" component="footer">
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <div>
            <img src="logon.png" alt="logo" />
            <Typography variant="h6" color="textPrimary">
              Brand name
            </Typography>
          </div>
          <Typography color="textPrimary" gutterBottom>
            common starter-landing banner subtitle
          </Typography>
          {<Copyright />}
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={4} justifyContent="space-evenly">
            {footers.map((footer) => (
              <Grid item xs={12} md={3} key={footer.title}>
                <div>
                  <Typography variant="h6" color="textPrimary" gutterBottom>
                    {footer.title}
                  </Typography>
                  <ul>
                    {footer.description.map((item, index) => (
                      <li key={item}>
                        <Link
                          href={footer.link[index]}
                          variant="subtitle1"
                          color="textSecondary"
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* {isMobile && (
                  <Accordion
                    square
                    classes={{
                      root: classes.accordionRoot,
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon className={classes.accordionIcon} />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      classes={{
                        content: classes.accordionContent,
                      }}
                    >
                      <strong>
                        {footer.title}
                      </strong>
                    </AccordionSummary>
                    <AccordionDetails>
                      <ul>
                        {footer.description.map((item, index) => (
                          <li key={item}>
                            <Link href={footer.link[index]} variant="subtitle1" color="textSecondary">
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </AccordionDetails>
                  </Accordion>
                )} */}
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <div>
            <IconButton aria-label="FB" size="small">
              <i className="ion-social-twitter" />
            </IconButton>
            <IconButton aria-label="TW" size="small">
              <i className="ion-social-facebook" />
            </IconButton>
            <IconButton aria-label="IG" size="small">
              <i className="ion-social-instagram" />
            </IconButton>
            <IconButton aria-label="LI" size="small">
              <i className="ion-social-linkedin" />
            </IconButton>
          </div>
          <Select
            onChange={handleChange}
            MenuProps={{
              container: ctn,
            }}
            startAdornment={
              <InputAdornment position="start">
                <LangIcon />
              </InputAdornment>
            }
            input={
              <OutlinedInput
                labelWidth={200}
                name="lang"
                id="outlined-lang-simple"
              />
            }
          >
            <MenuItem value="eng">English</MenuItem>
            <MenuItem value="deu">Deutsch</MenuItem>
            <MenuItem value="ara">العربيّة</MenuItem>
            <MenuItem value="ind">Bahasa Indonesia</MenuItem>
            <MenuItem value="prt">Português</MenuItem>
            <MenuItem value="zho">简体中文</MenuItem>
          </Select>
        </Grid>
      </Grid>
      {/* {isMobile && (
        <div className={align.textCenter}>
          <Box p={4}>
            <Copyright />
          </Box>
        </div>
      )} */}
    </Container>
  );
}
