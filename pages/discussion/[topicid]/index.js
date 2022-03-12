import { useRouter } from "next/router";
import _ from "lodash";

import Container from "react-bootstrap/Container";

import Layout from "../../../components/common/Layout";
import PostRedirectButton from "../../../components/common/PostRedirectButton";
import TopNavbar from "../../../components/NavBar/TopNavbar";
import ThreadBoard from "../../../components/Discussion/Post/ThreadBoard";
import AdminStatusSwitch from "../../../components/Discussion/Topic/AdminStatusSwitch";
import useUserContext from "../../../context/UserContext";

import styles from "../../../styles/Thread.module.css";

export default function Thread() {
  const router = useRouter();
  const user = useUserContext();

  if (_.isEmpty(router.query)) return null;

  return (
    <Layout title="Discussion">
      <TopNavbar />
      <Container className={styles.containter}>
        <ThreadBoard router={router} user={user} />
        <PostRedirectButton
          label="Post Your Answer"
          url={`/discussion/${router.query.topicid}/post`}
          user={user}
        />
        <AdminStatusSwitch router={router} user={user} />
      </Container>
    </Layout>
  );
}
