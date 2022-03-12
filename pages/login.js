import Container from "react-bootstrap/Container";

import Layout from "../components/common/Layout";
import TopNavbar from "../components/NavBar/TopNavbar";
import LoginForm from "../components/Login/LoginForm";

import styles from "../styles/Home.module.css";

export default function Login() {
  return (
    <Layout title="Login">
      <TopNavbar />
      <Container className={styles.main}>
        <LoginForm />
      </Container>
    </Layout>
  );
}
