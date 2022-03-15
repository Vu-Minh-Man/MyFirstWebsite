//const serverUrl = "https://sleepy-ocean-50803.herokuapp.com" || "http://localhost:8080";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8080";

const config = {
  apiUrl: serverUrl + "/api",
};

export default config;
