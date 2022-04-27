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
import VerificationAdmin from "../../../components/auth-components/VerificationAdmin";
toast.configure();

const verification_admin = () => {
  return (
    <div>
      <Head>
        <title>Astig03 - Admin Verification</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="absolute w-full">
        <HomeNavigation />
      </div>
      <VerificationAdmin />
    </div>
  );
};

export default verification_admin;
