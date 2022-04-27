import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import React, { useEffect, useState } from "react";
import axios from "axios";

import { useFormik } from "formik";
import { useRouter } from "next/router";
import { TextField, Button, MenuItem, Avatar } from "@mui/material";
import { toast } from "react-toastify";

import styledComponents from "styled-components";
import forms from "../../config/FormService";
import Copyright from "../public-components/Copyright";

// Icons
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";

toast.configure();
export default function SignIn() {
  const router = useRouter();

  // Use in forms dynamically
  const [userForm, setUserForm] = useState({ message: "", error: "" });
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await forms.user_login(event);
    if (!data.success) {
      setUserForm(data);
      toast.error(data.message);
    } else {
      setUserForm({ message: "", error: "" });
      toast.success("logging-in...");
      router.push("/views/user");
    }
  };

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 lg:col-span-4 text-black font-sans font-bold bg-white min-h-screen pl-7">
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
              Sign in
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

              <TextField
                margin="normal"
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={userForm.error == "password"}
                helperText={
                  userForm.error == "password" ? userForm.message : ""
                }
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Button
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
                startIcon={<GoogleIcon />}
              >
                Sign In With Google
              </Button>
              <Button
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
                startIcon={<FacebookIcon />}
              >
                Sign In With Facebook
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
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
}
