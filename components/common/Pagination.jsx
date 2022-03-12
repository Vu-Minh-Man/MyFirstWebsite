import PropTypes from "prop-types";

import _ from "lodash";

import BPagination from "react-bootstrap/Pagination";

function Pagination(props) {
  const { itemsCount, pageSize, currentPage, onClick } = props;

  if (itemsCount <= pageSize) return null;

  const lastPage = Math.ceil(itemsCount / pageSize);

  let items = [];
  for (let page = 1; page <= lastPage; page++) {
    items.push(
      <BPagination.Item
        key={page}
        active={page === currentPage}
        onClick={() => onClick(page)}
      >
        {page}
      </BPagination.Item>
    );
  }

  return <BPagination>{items}</BPagination>;
}

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Pagination;

function paginate(items, pageSize, currentPage) {
  if (
    !Array.isArray(items) ||
    !Number.isSafeInteger(pageSize) ||
    !Number.isSafeInteger(currentPage)
  )
    throw new Error("Invalid input for paginating.");

  const startIndex = (currentPage - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
}

export { paginate };
