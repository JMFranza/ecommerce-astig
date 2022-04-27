import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Head from "next/head";

import { useFormik } from "formik";
import { useRouter } from "next/router";
import { TextField, Button, MenuItem, Avatar } from "@mui/material";
import { toast } from "react-toastify";

import styledComponents from "styled-components";
import HomeNavigation from "../../../components/HomeNavigation";
import LoginAdmin from "../../../components/auth-components/LoginAdmin";
toast.configure();

const login_admin = () => {
  return (
    <div>
      <Head>
        <title>Astig03 - Login Admin</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <HomeNavigation />
      <LoginAdmin />
    </div>
  );
};

export default login_admin;
