import Router from "next/router";

import http from "./httpService";

const getUrl = "/discussion/topics";
const postUrl = getUrl;

function updateUrl(topicid) {
  return `${getUrl}/${topicid}`;
}

async function loadAll(setTopics) {
  try {
    const { data } = await http.get(getUrl);
    setTopics(data);
  } catch (error) {
    console.log(error);
  }
}

async function load(setTopic, topicid) {
  try {
    const { data } = await http.get(`${getUrl}/${topicid}`, {
      headers: { "x-data-type": "topic" },
    });
    if (!Array.isArray(setTopic)) setTopic(data);
    else {
      for (const setItem of setTopic) setItem(data);
    }
  } catch (error) {
    console.log(error);
  }
}

async function save(topic) {
  await http.post(postUrl, topic);
  Router.replace("/discussion");
}

async function update(topic, topicid) {
  await http.put(updateUrl(topicid), topic);
  Router.replace(`/discussion/${topicid}`);
}

export default { loadAll, load, save, update };
