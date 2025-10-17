import { TextField, TextFieldProps } from "@mui/material";
import { forwardRef } from "react";

export const MuiTextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => (
    <TextField
      {...props}
      variant="outlined"
      fullWidth
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: 2,
          backgroundColor: "background.paper",
        },
        mb: 3,
        ...props.sx,
      }}
      ref={ref}
    />
  )
);

MuiTextField.displayName = "MuiTextField";
