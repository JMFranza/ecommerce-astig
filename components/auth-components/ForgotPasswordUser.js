import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Autocomplete from "@mui/material/Autocomplete";

import React from "react";
import axios from "axios";
import GoogleLogin from "react-google-login";

import { TextField, Button, MenuItem, Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useTimer } from "react-timer-hook";

import styledComponents from "styled-components";
import forms from "../../config/FormService";
import Copyright from "../public-components/Copyright";
import AlertModal from "../public-components/AlertModal";

// Icons
import GoogleIcon from "@mui/icons-material/Google";
import global_var from "../../config/global_var.json";

toast.configure();
const ForgotPasswordUser = () => {
  const router = useRouter();
  // For verification
  const { seconds, restart } = useTimer({
    expiryTimestamp: new Date().setSeconds(new Date().getSeconds() + 0),
    onExpire: () => console.warn("onExpire called"),
  });

  // Use in forms dynamically
  const [userForm, setUserForm] = useState({ message: "", error: "" });
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form_data = new FormData(event.currentTarget);
    const { email } = Object.fromEntries(form_data);
    const data = await forms.forgot_password_user(email);
    if (!data.success) {
      setUserForm(data);
      toast.error(data.message);
    } else {
      setUserForm({ message: "", error: "" });
      toast.success("Check your inbox for changing your password");
    }
    const time = new Date();
    time.setSeconds(time.getSeconds() + 15);
    restart(time);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          User Forgot Password
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 1 }}
          autoComplete="off"
        >
          <TextField
            margin="normal"
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
            autoFocus
            error={userForm.error == "email"}
            helperText={userForm.error == "email" ? userForm.message : ""}
          />

          <Button
            type="submit"
            fullWidth
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
            disabled={seconds > 0}
          >
            {`Send Verification ${seconds <= 0 ? "" : seconds}`}
          </Button>

          <Box
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: "100vh", textAlign: "center" }}
            sx={{ my: 5 }}
          >
            <Link href="/views/auth/login-user" variant="body2">
              {"Already have an Account? Sign In"}
            </Link>
            <br />
            <Link href="/views/auth/register-user" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Box>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default ForgotPasswordUser;
