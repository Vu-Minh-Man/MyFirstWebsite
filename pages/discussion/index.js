import { Container } from "react-bootstrap";

import Layout from "../../components/common/Layout";
import PostRedirectButton from "../../components/common/PostRedirectButton";
import TopNavbar from "../../components/NavBar/TopNavbar";
import DiscussionBoard from "../../components/Discussion/Topic/DiscussionBoard";
import useUserContext from "../../context/UserContext";

import styles from "../../styles/Discussion.module.css";

export default function Discussion() {
  const user = useUserContext();

  return (
    <Layout title="Discussion">
      <TopNavbar />
      <Container className={styles.containter}>
        <PostRedirectButton
          label="Post New Topic"
          url="/discussion/post"
          user={user}
        />
        <DiscussionBoard />
      </Container>
    </Layout>
  );
}
