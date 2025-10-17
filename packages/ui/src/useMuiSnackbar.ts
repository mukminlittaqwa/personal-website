"use client";
import { useState } from "react";
import type { AlertColor } from "@mui/material";
import { MuiSnackbar } from "./MuiSnackbar";

export const useMuiSnackbar = () => {
  const [snackbar, setSnackbar] = useState<{
    message: string;
    severity?: AlertColor;
  } | null>(null);

  const showSnackbar = (message: string, severity?: AlertColor) => {
    setSnackbar({ message, severity });
    setTimeout(() => setSnackbar(null), 4000); // auto-close
  };

  const SnackbarElement = snackbar ? MuiSnackbar : null;

  return { showSnackbar, SnackbarElement };
};
