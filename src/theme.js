import React from "react";
import { createTheme } from "@material-ui/core/styles";
import { blue, pink, black } from "@mui/material/colors";
const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: pink,
  },
});

export default theme;
