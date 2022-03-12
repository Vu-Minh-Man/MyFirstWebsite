import Router from "next/router";

import http from "./httpService";

function getUrl(topicid) {
  return `/discussion/topics/${topicid}`;
}

function postUrl(topicid) {
  return getUrl(topicid);
}

function updateUrl(topicid, postid) {
  return `${getUrl(topicid)}/${postid}`;
}

async function loadAll(setPosts, topicid) {
  try {
    const { data } = await http.get(getUrl(topicid), {
      headers: { "x-data-type": "post" },
    });
    setPosts(data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      const { data: errorMessage } = error.response;
      Router.push("/discussion");
      alert(errorMessage);
    }
  }
}

async function load(setPost, topicid, postid) {
  try {
    const { data } = await http.get(updateUrl(topicid, postid));
    setPost(data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      const { data: errorMessage } = error.response;
      Router.push("/discussion");
      alert(errorMessage);
    }
  }
}

async function save(post, topicid) {
  await http.post(postUrl(topicid), post);
  Router.replace(`/discussion/${topicid}`);
}

async function update(post, topicid, postid) {
  await http.put(updateUrl(topicid, postid), post);
  Router.replace(`/discussion/${topicid}`);
}

export default { loadAll, load, save, update };
