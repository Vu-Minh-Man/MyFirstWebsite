import Button from "react-bootstrap/button";

function getColumns(user, topicid) {
  const columns = [
    {
      label: "User",
      type: "text",
      path: "user.username",
      key: "user",
    },
    {
      label: "Content",
      type: "text",
      path: "content",
      key: "title",
    },
    {
      label: "Created Date",
      type: "text",
      path: "createdDate",
      key: "createdDate",
    },
    {
      type: "feature",
      feature: (post) =>
        user &&
        user._id === post.user._id && (
          <Button
            variant="primary"
            href={`/discussion/${topicid}/${post._id}/edit`}
          >
            Edit
          </Button>
        ),
      key: "editbutton",
    },
  ];

  return columns;
}

const maxPostsPerPage = 4;

export { getColumns, maxPostsPerPage };
