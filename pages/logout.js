import { useEffect } from "react";
import Layout from "../components/common/Layout";
import TopNavbar from "../components/NavBar/TopNavbar";

import user from "../services/userService";

export default function Logout() {
  useEffect(() => user.logout());

  return (
    <Layout title="Logout">
      <TopNavbar />
    </Layout>
  );
}
