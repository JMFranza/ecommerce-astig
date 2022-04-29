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
const RegisterUser = () => {
  const router = useRouter();

  // For verification
  const { seconds, restart } = useTimer({
    expiryTimestamp: new Date().setSeconds(new Date().getSeconds() + 10),
    onExpire: () => console.warn("onExpire called"),
  });
  const [isRegistered, setIsRegistered] = useState(false);
  const [userRegisterValues, setUserRegisterValues] = useState({});

  // Use in forms dynamically
  const [userForm, setUserForm] = useState({ message: "", error: "" });
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await forms.user_register(event);
    if (!data.success) {
      setUserForm(data);
      toast.error(data.message);
    } else {
      setUserRegisterValues(data.values);
      setUserForm({ message: "", error: "" });
      toast.success("Created user successfully");
      setIsRegistered(true);
    }
  };
  const submit_verifiction = async () => {
    const email = userRegisterValues.email;
    const data = await forms.user_verification(email);
    const time = new Date();
    time.setSeconds(time.getSeconds() + 15);
    restart(time);
  };

  const google_register_success = async (googleData) => {
    const data = await forms.google_login_user(googleData);
    if (!data.success) {
      toast.error(
        "Something wrong logging in with google. Please try again later"
      );
    } else {
      setUserForm({ message: "", error: "" });
      router.push("/views/user");
    }
  };

  const google_register_failure = (result) => {
    toast.error(
      "Something wrong logging in with google. Please try again later"
    );
  };

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 lg:col-span-4 text-black font-sans font-bold bg-white min-h-screen pl-7">
        <AlertModal
          open={isRegistered}
          setOpen={setIsRegistered}
          title={"Email verification"}
          message={
            "Have you recieved your email? If not. Check your spam folder. You can resend the verification by click the resend button for every 15 seconds."
          }
          ok_button={`Resend verification ${seconds <= 0 ? "" : seconds}`}
          ok_activate={() => {
            submit_verifiction();
          }}
          ok_disable={seconds > 0}
          cancel_button={"Sign Up"}
          cancel_activate={() => {
            router.push("/views/auth/login-user");
          }}
        />

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
              Sign Up User
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
                id="username"
                label="Username"
                name="username"
                type="text"
                error={userForm.error == "text"}
                helperText={userForm.error == "text" ? userForm.message : ""}
              />

              <TextField
                margin="normal"
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                error={userForm.error == "email"}
                helperText={userForm.error == "email" ? userForm.message : ""}
              />

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
                helperText={
                  userForm.error == "password" ? userForm.message : ""
                }
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
                  userForm.error == "password_confirmation"
                    ? userForm.message
                    : ""
                }
              />
              <TextField
                margin="normal"
                variant="outlined"
                required
                fullWidth
                name="full_name"
                label="Full Name"
                type="text"
                id="full_name"
                error={userForm.error == "full_name"}
                helperText={
                  userForm.error == "full_name" ? userForm.message : ""
                }
              />
              <Autocomplete
                id="country-autocomplete"
                options={global_var.countries}
                autoHighlight
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    <img
                      loading="lazy"
                      width="20"
                      src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                      alt=""
                    />
                    {option.label} ({option.code}) +{option.phone}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="country"
                    label="Country"
                    type="country"
                    id="country"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                    error={userForm.error == "country"}
                    helperText={
                      userForm.error == "country" ? userForm.message : ""
                    }
                  />
                )}
              />

              <TextField
                margin="normal"
                variant="outlined"
                required
                fullWidth
                name="city"
                label="City"
                type="text"
                id="city"
                error={userForm.error == "city"}
                helperText={userForm.error == "city" ? userForm.message : ""}
              />
              <TextField
                margin="normal"
                variant="outlined"
                required
                fullWidth
                name="postal_code"
                label="Postal Code"
                type="number"
                id="postal_code"
                error={userForm.error == "postal_code"}
                helperText={
                  userForm.error == "postal_code" ? userForm.message : ""
                }
              />

              <Button
                type="submit"
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Sign In with Google"
                onSuccess={google_register_success}
                onFailure={google_register_failure}
                cookiePolicy={"single_host_origin"}
                render={(renderProps) => (
                  <Button
                    fullWidth
                    variant="outlined"
                    sx={{ mb: 2 }}
                    startIcon={<GoogleIcon />}
                    onClick={renderProps.onClick}
                  >
                    Sign Up With Google
                  </Button>
                )}
              ></GoogleLogin>
              <Grid container>
                <Grid item xs>
                  <Link href="/views/auth/forgot-password-user" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/views/auth/login-user" variant="body2">
                    {"Already have an Account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </div>

      <div className="banner col-span-8 text-white font-sans font-bold"></div>
    </div>
  );
};

export default RegisterUser;
