import { useState, useEffect } from "react";

import Table from "../../common/Table";
import Pagination, { paginate } from "../../common/Pagination";
import { getColumns, maxPostsPerPage } from "./initialThreadBoardState";
import postService from "../../../services/postService";

function ThreadBoard(props) {
  const { router, user } = props;
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    postService.loadAll(setPosts, router.query.topicid);
  }, [router]);

  const handlePageChange = (newPage) => {
    if (newPage === page) return null;

    setPage(newPage);
  };

  const getPostsOnPage = () => {
    return paginate(posts, maxPostsPerPage, page);
  };

  const postsOnPage = getPostsOnPage();

  return (
    <>
      <p>
        Showing {posts.length} post{posts.length <= 1 ? "" : "s"}.
      </p>
      <Table
        data={postsOnPage}
        columns={getColumns(user, router.query.topicid)}
        tableClassName="threadboard"
      />
      <Pagination
        itemsCount={posts.length}
        pageSize={maxPostsPerPage}
        currentPage={page}
        onClick={handlePageChange}
      />
    </>
  );
}

export default ThreadBoard;
