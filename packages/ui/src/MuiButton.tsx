import { Button, ButtonProps } from "@mui/material";

export const MuiButton = (props: ButtonProps) => (
  <Button
    {...props}
    variant={props.variant || "contained"}
    color={props.color || "primary"}
    sx={{
      borderRadius: 2,
      textTransform: "none",
      ...props.sx,
    }}
  />
);
