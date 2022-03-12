import Router from "next/router";

import joi from "joi";
import { joiPassword } from "joi-password";
import jwtDecode from "jwt-decode";

import http, { tokenKey, tokenHeader, getToken } from "./httpService";

const signUpUrl = "/user";
const loginUrl = "/login";

async function signUp(username, email, password) {
  const { headers } = await http.post(signUpUrl, {
    username,
    email,
    password,
  });

  localStorage.setItem(tokenKey, headers[tokenHeader]);
  window.location = "/";
}

async function login(userId, password) {
  const { headers } = await http.post(loginUrl, {
    [userId.type]: userId.value,
    password,
  });

  localStorage.setItem(tokenKey, headers[tokenHeader]);
  window.location = "/";
}

function logout() {
  localStorage.removeItem(tokenKey);
  Router.replace("/");
}

function getCurrentUser() {
  try {
    const token = getToken();
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
}

const check = {
  username: (username) =>
    http.post(signUpUrl, {
      username,
    }),
  email: (email) =>
    http.post(signUpUrl, {
      email,
    }),
};

const signUpSchema = {
  username: joi.string().min(5).max(50).label("Username").required(),
  email: joi
    .string()
    .min(5)
    .max(256)
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .label("Email")
    .required(),
  password: joiPassword
    .string()
    .min(5)
    .max(12)
    .noWhiteSpaces()
    .messages({
      "password.noWhiteSpaces": "{#label} should not contain white spaces",
    })
    .label("Password")
    .required(),
};

// const loginSchema = {
//   username: joi.string().min(5).max(50).label("Username").required(),
//   email: joi.string().min(5).max(256).label("Email").required(),
//   password: joiPassword.string().min(5).max(12).label("Password").required(),
// };

export default { signUp, login, logout, check };
export { getCurrentUser, signUpSchema };
