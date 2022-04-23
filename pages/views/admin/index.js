import React from "react";
import axios from "axios";
import Link from "next/link";

import { useFormik } from "formik";
import { useRouter } from "next/router";

const index = () => {
  const router = useRouter();
  const logout = () => {
    axios
      .delete("/api/auth/logout")
      .then((res) => {
        router.push("/views/auth/login-admin");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <button onClick={logout}>logout admin</button>
    </div>
  );
};

export default index;
