import Link from "next/link";
import _ from "lodash";

import { Table as BTable } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";

function Table(props) {
  const {
    data,
    dataProps,
    columns,
    sortColumn,
    onSort,
    tableClassName,
    disable,
  } = props;
  if (disable) return null;

  return (
    <BTable>
      <TableHeader
        columns={columns}
        sortColumn={sortColumn}
        onSort={onSort}
        tableClassName={tableClassName}
      />
      <TableBody
        data={data}
        dataProps={dataProps}
        columns={columns}
        tableClassName={tableClassName}
      />
    </BTable>
  );
}

Table.defaultProps = {
  dataProps: { id: "_id" },
  onSort: () => {},
  disable: false,
};

function TableHeader(props) {
  const { columns, sortColumn, onSort, tableClassName } = props;

  const raiseSort = (column) => {
    const sort = { ...sortColumn };

    if (column.key === sort.key) {
      sort.order = sort.order === "asc" ? "desc" : "asc";
    } else {
      sort.path = column.path;
      sort.order = "asc";
      sort.key = column.key;
    }

    onSort(sort);
  };

  const getAttributeOnClick = (column) => {
    return column.sortable ? { onClick: () => raiseSort(column) } : null;
  };

  //   const getAttributeHoverCursor = (sortable) => {
  //     return sortable ? { style: { ...{ cursor: "pointer" } } } : {};
  //   };

  const getClassName = (key, sortable) => {
    return (
      tableClassName + "-" + key + (sortable ? " table-header-sortable" : "")
    );
  };

  const getSortIcon = (column) => {
    if (!column.sortable || column.key !== sortColumn.key) return null;

    return sortColumn.order === "asc" ? (
      <FontAwesomeIcon icon={faSortUp} />
    ) : (
      <FontAwesomeIcon icon={faSortDown} />
    );
  };

  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            key={column.key}
            {...getAttributeOnClick(column)}
            className={getClassName(column.key, column.sortable)}
          >
            {column.label} {getSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function TableBody(props) {
  const { data, dataProps, columns, tableClassName } = props;

  const renderCell = (item, col) => {
    switch (col.type) {
      case "text":
        return (
          <td key={col.key} className={tableClassName + "-" + col.key}>
            {_.get(item, col.path)}
          </td>
        );
      case "feature":
        return (
          <td key={col.key} className={tableClassName + "-" + col.key}>
            {col.feature(item)}
          </td>
        );
      case "image":
        return (
          <td key={col.key} className={tableClassName + "-" + col.key}>
            <img src={item.url} />
          </td>
        );
      case "link-text":
        return (
          <td key={col.key} className={tableClassName + "-" + col.key}>
            <Link href={`${col.baseUrl}/${_.get(item, col.urlPath)}`}>
              {_.get(item, col.path)}
            </Link>
          </td>
        );
      case "tag":
        return (
          <td key={col.key} className={tableClassName + "-" + col.key}>
            {col.tagMap
              ? col.tagMap[_.get(item, col.path)]
              : _.get(item, col.path)}
          </td>
        );
    }

    return null;
  };

  return (
    <tbody>
      {data.map((item) => (
        <tr key={item[dataProps.id]}>
          {columns.map((col) => renderCell(item, col))}
        </tr>
      ))}
    </tbody>
  );
}

// TableBody.defaultProps = {
//   dataProps: { id: "_id" },
// };

export default Table;
