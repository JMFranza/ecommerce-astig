import React from "react";
import axios from "axios";
import Link from "next/link";

import { useFormik } from "formik";
import { useRouter } from "next/router";

const login_user = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      axios
        .post("/api/auth/login-user", values)
        .then((res) => {
          if (res.data.success) {
            router.push("/views/user");
          }
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit} style={{ width: "14%" }}>
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default login_user;
