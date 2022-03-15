import { useRouter } from "next/router";
import _ from "lodash";

import { Container } from "react-bootstrap";

import Layout from "../../../components/common/Layout";
import TopNavbar from "../../../components/NavBar/TopNavbar";
import PostForm from "../../../components/Discussion/Post/PostForm";

import styles from "../../../styles/Thread.module.css";

export default function Post() {
  const router = useRouter();

  if (_.isEmpty(router.query)) return null;

  return (
    <Layout title="Post your answer">
      <TopNavbar />
      <Container className={styles.containter}>
        <PostForm router={router} />
      </Container>
    </Layout>
  );
}
