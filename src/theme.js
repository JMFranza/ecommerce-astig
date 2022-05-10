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
  overrides: {
    MuiOutlinedInput: {
      input: {
        "&:-webkit-autofill": {
          "-webkit-box-shadow": "0 0 0 100px #000 inset",
          "-webkit-text-fill-color": "#fff",
        },
      },
    },
  },
});

export default theme;
