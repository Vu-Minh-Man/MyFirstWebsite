import { useRouter } from "next/router";
import _ from "lodash";
import { Container } from "react-bootstrap";

import Layout from "../../../../components/common/Layout";
import TopNavbar from "../../../../components/NavBar/TopNavbar";
import EditPostForm from "../../../../components/Discussion/Post/EditPostForm";

import styles from "../../../../styles/Thread.module.css";

export default function EditPost() {
  const router = useRouter();

  if (_.isEmpty(router.query)) return null;

  return (
    <Layout title="Edit post">
      <TopNavbar />
      <Container className={styles.containter}>
        <EditPostForm router={router} />
      </Container>
    </Layout>
  );
}
