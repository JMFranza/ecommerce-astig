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
import VerificationUser from "../../../components/auth-components/VerificationUser";
toast.configure();

const verification_user = () => {
  return (
    <div>
      <Head>
        <title>Astig03 - User Verification</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <HomeNavigation />
      <VerificationUser />
    </div>
  );
};

export default verification_user;
