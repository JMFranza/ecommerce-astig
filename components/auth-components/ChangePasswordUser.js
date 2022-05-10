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
const ChangePasswordUser = () => {
  const router = useRouter();
  const [isChanged, setIsChanged] = useState(false);

  // Use in forms dynamically
  const [userForm, setUserForm] = useState({ message: "", error: "" });
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await forms.user_change_password({ event, ...router.query });
    if (!data.success) {
      setUserForm(data);
      toast.error(data.message);
    } else {
      setUserForm({ message: "", error: "" });
      setIsChanged(true);
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <AlertModal
        open={isChanged}
        setOpen={setIsChanged}
        title={"Password has been change"}
        message={
          "Your account password has been changed! you can now sign up by click the button below."
        }
        ok_button={`Sign in now`}
        ok_activate={() => {
          router.push("/views/auth/login-user");
        }}
      />
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
            name="password"
            label="Password"
            type="password"
            id="password"
            error={userForm.error == "password"}
            helperText={userForm.error == "password" ? userForm.message : ""}
          />
          <TextField
            margin="normal"
            variant="outlined"
            required
            fullWidth
            name="password_confirmation"
            label="Confirm Password"
            type="password"
            id="password_confirmation"
            error={userForm.error == "password_confirmation"}
            helperText={
              userForm.error == "password_confirmation" ? userForm.message : ""
            }
          />

          <Button
            type="submit"
            fullWidth
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
          >
            Change Password
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default ChangePasswordUser;
