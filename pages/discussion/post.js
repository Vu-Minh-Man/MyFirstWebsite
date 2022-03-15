import { Container } from "react-bootstrap";

import Layout from "../../components/common/Layout";
import TopNavbar from "../../components/NavBar/TopNavbar";
import TopicForm from "../../components/Discussion/Topic/TopicForm";

import styles from "../../styles/Discussion.module.css";

export default function Post() {
  return (
    <Layout title="Post new topic">
      <TopNavbar />
      <Container className={styles.containter}>
        <TopicForm />
      </Container>
    </Layout>
  );
}
