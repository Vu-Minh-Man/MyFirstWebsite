import { useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import FormItem from "../../common/FormItem";
import useUserContext from "../../../context/UserContext";
import postService from "../../../services/postService";

function PostForm(props) {
  const { router } = props;
  const user = useUserContext();

  useEffect(() => {
    if (!user) {
      router.replace("/discussion");
      return alert("Please Login!");
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const post = {
      content: e.target.content.value,
    };

    if (!user) {
      router.replace("/discussion");
      return alert("Please Login!");
    }

    if (!isValidPost(post))
      return alert(
        "Invalid post. Content must be no longer than 1024 characters."
      );

    postAsync(post);
  };

  const postAsync = async (post) => {
    try {
      await postService.save(post, router.query.topicid);
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
      <Form.Group controlId="post">
        <FormItem id="content" as="textarea" label="Content" />
        <Button variant="primary" type="submit">
          Post
        </Button>
      </Form.Group>
    </Form>
  );
}

export default PostForm;
