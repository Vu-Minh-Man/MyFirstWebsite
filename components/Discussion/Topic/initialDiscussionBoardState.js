const status = [
  { _id: false, label: "Active" },
  { _id: true, label: "Archive" },
];

const columns = [
  {
    label: "Thread Starter",
    type: "text",
    path: "user.username",
    sortable: true,
    key: "threadStarter",
  },
  {
    label: "Title",
    type: "link-text",
    baseUrl: "/discussion",
    urlPath: "_id",
    path: "title",
    sortable: true,
    key: "title",
  },
  {
    label: "Created Date",
    type: "text",
    path: "createdDate",
    sortable: true,
    key: "createdDate",
  },
  {
    label: "Last Posting Date",
    type: "text",
    path: "lastPostingDate",
    sortable: true,
    key: "lastPostingDate",
  },
  {
    label: "Status",
    type: "tag",
    tagMap: status.reduce((acc, v) => {
      acc[v._id] = v.label;
      return acc;
    }, {}),
    path: "isArchive",
    sortable: false,
    key: "status",
  },
];

const initialSort = {
  path: columns[3].path,
  order: "desc",
  key: columns[3].key,
};

const maxTopicsPerPage = 3;

export { columns, initialSort, maxTopicsPerPage, status };
