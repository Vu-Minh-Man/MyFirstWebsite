import config from "../config/config";
import axios from "axios";

const tokenKey = "token";
const tokenHeader = "x-auth-token";

axios.interceptors.response.use(null, (error) => {
  if (!error.code) {
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedError) {
      alert("An unexpected error occurred.");
      console.error(error);
    }
  }

  return Promise.reject(error);
});

axios.defaults.baseURL = config.apiUrl;
axios.defaults.headers.common[tokenHeader] = getToken();

function getToken() {
  if (typeof window !== "undefined") return localStorage.getItem(tokenKey);
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export { tokenKey, tokenHeader, getToken };
