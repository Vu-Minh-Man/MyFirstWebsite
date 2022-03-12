import { useState, useEffect } from "react";
import _ from "lodash";

import Table from "../../common/Table";
import Pagination, { paginate } from "../../common/Pagination";

import {
  columns,
  initialSort,
  maxTopicsPerPage,
} from "./initialDiscussionBoardState";
import topicService from "../../../services/topicService";

function DiscussionBoard() {
  const [topics, setTopics] = useState([]);
  const [sort, setSort] = useState(initialSort);
  const [page, setPage] = useState(1);

  useEffect(() => {
    topicService.loadAll(setTopics);
  }, []);

  const handleSort = (newSort) => {
    setSort(newSort);
  };

  const handlePageChange = (newPage) => {
    if (newPage === page) return null;

    setPage(newPage);
  };

  const getTopicsOnPage = () => {
    const sortedTopics = _.orderBy(topics, [sort.path], [sort.order]);

    return paginate(sortedTopics, maxTopicsPerPage, page);
  };

  const topicsOnPage = getTopicsOnPage();

  return (
    <>
      <p>
        Showing {topics.length} topic{topics.length <= 1 ? "" : "s"}.
      </p>
      <Table
        data={topicsOnPage}
        columns={columns}
        sortColumn={sort}
        onSort={handleSort}
        tableClassName="discussionboard"
      />
      <Pagination
        itemsCount={topics.length}
        pageSize={maxTopicsPerPage}
        currentPage={page}
        onClick={handlePageChange}
      />
    </>
  );
}

// export async function getStaticProps() {
//   const res = await fetch();
//   const topics = await res.json();

//   return {
//     props: {
//       topics,
//     },
//   };
// }

export default DiscussionBoard;
