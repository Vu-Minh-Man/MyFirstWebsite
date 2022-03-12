import { useState, useEffect } from "react";
import _ from "lodash";

//import Container from "react-bootstrap/container";
import Row from "react-bootstrap/row";
import Col from "react-bootstrap/col";
import Button from "react-bootstrap/button";
import Form from "react-bootstrap/form";
import FormOption from "../../common/FormOption";

import topicService from "../../../services/topicService";
import { status } from "./initialDiscussionBoardState";

function AdminStatusSwitch(props) {
  const { router, user } = props;
  const [topic, setTopic] = useState({});
  const [selectedTopicState, setSelectedTopicState] = useState({});

  useEffect(() => {
    topicService.load([setTopic, setSelectedTopicState], router.query.topicid);
  }, [router]);

  const handleChange = (e) => {
    const {
      target: { value },
    } = e;

    const changedTopic = { ...selectedTopicState };
    changedTopic.isArchive = JSON.parse(value);

    setSelectedTopicState(changedTopic);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const changedTopic = {
      title: selectedTopicState.title,
      isArchive: selectedTopicState.isArchive,
    };

    changeStatusAsync(changedTopic);
  };

  const changeStatusAsync = async (changedTopic) => {
    try {
      await topicService.update(changedTopic, router.query.topicid);
      alert(
        `Topic is ${
          status.find((item) => item._id === changedTopic.isArchive).label
        }`
      );
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

  const isChanged = () => topic.isArchive !== selectedTopicState.isArchive;

  if (_.isEmpty(selectedTopicState) || !user || !user.isAdmin) return null;

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="m-2" controlId="status">
        <Row>
          <Col>
            <FormOption
              label="Status"
              options={status}
              onChange={handleChange}
              selected={selectedTopicState.isArchive}
            />
          </Col>
          <Col>
            <Button variant="primary" type="submit" disabled={!isChanged()}>
              OK
            </Button>
          </Col>
        </Row>
      </Form.Group>
    </Form>
  );
}

export default AdminStatusSwitch;
