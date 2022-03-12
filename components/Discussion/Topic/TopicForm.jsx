import { useEffect } from "react";
import Router from "next/router";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import FormItem from "../../common/FormItem";
import useUserContext from "../../../context/UserContext";
import topicService from "../../../services/topicService";

function TopicForm() {
  const user = useUserContext();

  useEffect(() => {
    if (!user) {
      Router.replace("/discussion");
      return alert("Please Login!");
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const topic = {
      title: e.target.title.value,
      content: e.target.content.value,
    };

    if (!user) {
      Router.replace("/discussion");
      return alert("Please Login!");
    }

    if (!isValidTopic(topic))
      return alert(
        "Invalid post. Title's length must be 5-256 characters. Content must be no longer than 1024 characters."
      );

    postAsync(topic);
  };

  const postAsync = async (topic) => {
    try {
      await topicService.save(topic);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const { data: errorMessage } = error.response;
        alert(errorMessage);
      }
    }
  };

  const isValidTopic = ({ title, content }) => {
    const validType = typeof title === "string" && typeof content === "string";
    const validLength =
      title.length >= 5 &&
      title.length <= 256 &&
      content.length >= 1 &&
      content.length <= 1024;
    return validType && validLength;
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="post">
        <FormItem id="title" label="Title" />
        <FormItem id="content" as="textarea" label="Content" />
        <Button variant="primary" type="submit">
          Post
        </Button>
      </Form.Group>
    </Form>
  );
}

export default TopicForm;
