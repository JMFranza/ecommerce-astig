import React from "react";
import { createTheme } from "@material-ui/core/styles";
import { blue, pink, black } from "@mui/material/colors";
const theme = createTheme({
  screens: {
    sm: "480px",
    md: "768px",
    lg: "976px",
    xl: "1440px",
  },
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: pink,
  },

  typography: { useNextVariants: true },
});

export default theme;
