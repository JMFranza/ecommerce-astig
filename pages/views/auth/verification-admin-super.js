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
import VerificationAdminSuper from "../../../components/auth-components/VerificationAdminSuper";

import forms from "../../../config/FormService";
toast.configure();

const verification_admin_super = () => {
  const [adminAccount, setAdminAccount] = useState({});
  const getAdminAccount = async () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const token = params.token;
    const data = await forms.get_admin_account(token);
    if (data.success) setAdminAccount(data);
  };
  useEffect(() => {
    getAdminAccount();
  }, [setAdminAccount]);
  return (
    <div>
      <Head>
        <title>Astig03 - Main Admin Verification </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <HomeNavigation />
      <VerificationAdminSuper profile={adminAccount} />
    </div>
  );
};

export default verification_admin_super;
