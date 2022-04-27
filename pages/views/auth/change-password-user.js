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
import ChangePasswordUser from "../../../components/auth-components/ChangePasswordUser";
toast.configure();
const change_password_user = () => {
  return (
    <div>
      <Head>
        <title>Astig03 - Change password user</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <HomeNavigation />
      <ChangePasswordUser />
    </div>
  );
};

export default change_password_user;
