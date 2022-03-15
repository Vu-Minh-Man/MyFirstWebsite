import { Container } from "react-bootstrap";

import Layout from "../components/common/Layout";
import TopNavbar from "../components/NavBar/TopNavbar";
import SignUpForm from "../components/SignUp/SignUpForm";

import styles from "../styles/Home.module.css";

export default function SignUp() {
  return (
    <Layout title="Sign Up">
      <TopNavbar />
      <Container className={styles.main}>
        <SignUpForm />
      </Container>
    </Layout>
  );
}
