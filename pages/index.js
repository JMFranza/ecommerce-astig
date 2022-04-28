import Head from "next/head";
import Image from "next/image";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import HomeNavigation from "../components/HomeNavigation";
export default function Home() {
  return (
    <div>
      <HomeNavigation />
    </div>
  );
}
