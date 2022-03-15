import { Container } from "react-bootstrap";

import Layout from "../components/common/Layout";
import TopNavbar from "../components/NavBar/TopNavbar";
import HomePage from "../components/Home/HomePage";

import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <Layout title="Home">
      <TopNavbar />
      <Container className={styles.main}>
        <HomePage />
      </Container>
    </Layout>
  );
}
