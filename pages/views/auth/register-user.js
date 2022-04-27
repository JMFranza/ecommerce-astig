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

toast.configure();

const register_user = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      password_confirmation: "",
      full_name: "",
      city: "",
      postal_code: "",
      country: "",
    },

    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div>
      <Head>
        <title>Astig03 - Register User</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <form onSubmit={formik.handleSubmit} style={{ width: "14%" }}>
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <label htmlFor="password_confirmation">Confirm Password</label>
        <input
          id="password_confirmation"
          name="password_confirmation"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password_confirmation}
        />
        <label htmlFor="full_name">Full name </label>
        <input
          id="full_name"
          name="full_name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.full_name}
        />
        <label htmlFor="city">City</label>
        <input
          id="city"
          name="city"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.city}
        />
        <label htmlFor="postal_code"> Postal Code </label>
        <input
          id="postal_code"
          name="postal_code"
          type="postal_code"
          onChange={formik.handleChange}
          value={formik.values.postal_code}
        />
        <label htmlFor="country"> Country </label>
        <input
          id="country"
          name="country"
          type="country"
          onChange={formik.handleChange}
          value={formik.values.country}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default register_user;
