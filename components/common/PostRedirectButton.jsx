import { Button } from "react-bootstrap";

function PostRedirectButton(props) {
  const { label, url, user, allowAnonymous } = props;

  if (allowAnonymous) {
    return (
      <Button variant="primary" href={url}>
        {label}
      </Button>
    );
  }

  return (
    user && (
      <Button variant="primary" href={url}>
        {label}
      </Button>
    )
  );
}

PostRedirectButton.defaultProps = {
  allowAnonymous: false,
};

export default PostRedirectButton;
