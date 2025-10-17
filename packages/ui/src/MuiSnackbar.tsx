"use client";
import { Snackbar, Alert, AlertColor } from "@mui/material";
import { useState, SyntheticEvent } from "react";

export interface MuiSnackbarProps {
  message: string;
  severity?: AlertColor;
  autoHideDuration?: number;
}

export const MuiSnackbar = ({
  message,
  severity = "info",
  autoHideDuration = 4000,
}: MuiSnackbarProps) => {
  const [open, setOpen] = useState(true);

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      autoHideDuration={autoHideDuration}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        sx={{ width: "100%", borderRadius: 2 }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
