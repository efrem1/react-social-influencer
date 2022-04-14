import React, { useState, useEffect } from "react";
import {
  Paper,
  Box,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { API_URL } from "../../Api";
import { useTranslation } from "react-i18next";

const columns = [
  { field: "index", headerName: "ID", width: 70 },
  { field: "title", headerName: "Category", width: 300 },
];

export const Categories = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch(`${API_URL}/categories`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    })
      .then((res) => res.json())
      .then((_categories) => {
        console.log(_categories);
        setCategories(
          _categories.map((item, index) => ({
            id: item.id,
            index: index + 1,
            title: t(`categories.${item.key}`),
          }))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const openDialog = () => {
    setOpen(true);
  };
  const closeDialog = () => {
    setOpen(false);
  };
  const createCategory = () => {
    closeDialog();
    fetch(`${API_URL}/categories`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    })
      .then((res) => res.json())
      .then((categories) => {
        console.log(categories);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Box sx={{ p: 1 }}>
      <Paper style={{ height: "90vh", width: "100%" }}>
        <DataGrid
          rows={categories}
          columns={columns}
          color="secondary"
          pageSize={15}
          rowsPerPageOptions={[15]}
          //checkboxSelection
        />
      </Paper>
      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle>New Category</DialogTitle>
        <DialogContent sx={{ minWidth: "60vh" }}>
          <DialogContentText>No categories,Create categories</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button color="secondary" onClick={createCategory}>
            Creates Categories
          </Button>
        </DialogActions>
      </Dialog>
      {!categories.length > 0 && (
        <Fab
          color="secondary"
          aria-label="add"
          onClick={openDialog}
          sx={{ position: "absolute", bottom: 16, right: 16 }}
        >
          <Add />
        </Fab>
      )}
    </Box>
  );
};
