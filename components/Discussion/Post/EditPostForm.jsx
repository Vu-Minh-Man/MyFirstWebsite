import { useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import FormItem from "../../common/FormItem";

import useUserContext from "../../../context/UserContext";
import postService from "../../../services/postService";

function EditPostForm(props) {
  const { router } = props;
  const [post, setPost] = useState({ content: "" });
  const user = useUserContext();

  useEffect(() => {
    postService.load(setPost, router.query.topicid, router.query.postid);
  }, [router]);

  useEffect(() => {
    if (!user) {
      router.replace("/discussion");
      return alert("Please Login!");
    }
  }, [user]);

  const handleOnChange = (e) => {
    const {
      currentTarget: { value },
    } = e;
    setPost({ content: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      router.replace("/discussion");
      return alert("Please Login!");
    }

    if (!isValidPost(post))
      return alert(
        "Invalid post. Content must be no longer than 1024 characters."
      );

    updateAsync(post);
  };

  const updateAsync = async (post) => {
    try {
      await postService.update(post, router.query.topicid, router.query.postid);
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 400 || error.response.status === 404)
      ) {
        const { data: errorMessage } = error.response;
        alert(errorMessage);
      }
    }
  };

  const isValidPost = ({ content }) => {
    const validType = typeof content === "string";
    const validLength = content.length >= 1 && content.length <= 1024;
    return validType && validLength;
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="edit">
        <FormItem
          id="content"
          as="textarea"
          label="Content"
          data={post.content}
          onChange={handleOnChange}
        />
        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form.Group>
    </Form>
  );
}

export default EditPostForm;
