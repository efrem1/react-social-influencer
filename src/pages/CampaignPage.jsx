import React, { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import BrandLayout from "../layouts/BrandLayout";
import { CampaignCard } from "../components/CampaignCard";
import { useQuery } from "../hooks";

import empty from "../assets/empty.png";
export default function BrandDashboard() {
  const [campaign, setCampaign] = useState({ data: [] });
  const query = useQuery();
  const status = query.get("status");
  useEffect(() => {
    if (!status) {
      fetch(`http://localhost:5050/api/campaign?status=all`)
        .then((res) => res.json())
        .then((cam) => {
          console.log(cam);
          setCampaign(cam);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  useEffect(() => {
    if (!status) {
      return;
    }
    fetch(`http://localhost:5050/api/campaign?status=${status}`)
      .then((res) => res.json())
      .then((cam) => {
        setCampaign(cam);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [status]);
  function removeItem(id) {
    const temp = campaign.data;
    temp.filter((i) => i.id !== id);
    setCampaign((prev) => ({ ...prev, data: temp }));
  }
  if (campaign.data.length === 0) {
    return (
      <BrandLayout drawer={true}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            backgroundColor: "white",
          }}
        >
          <img src={empty} style={{ width: 600, height: 500 }} />
        </Box>
      </BrandLayout>
    );
  }
  return (
    <BrandLayout drawer={true}>
      <Grid container spacing={2}>
        {campaign.data.map((item, index) => {
          return (
            <Grid item sm={3.5} sx={{ m: 1 }}>
              <CampaignCard item={item} removeItem={removeItem} />
            </Grid>
          );
        })}
      </Grid>
    </BrandLayout>
  );
}
