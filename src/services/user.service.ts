import axios from "axios";
import { getTokenFromStorage } from "utils/helpers";

export const userService = {
  getUser,
  getToken,
};

async function getToken() {
    return axios({
      method: "GET",
      url: `${process.env.REACT_APP_SSO_HOST}/ssoauthz/api/v1/token`,
      withCredentials: true,
    });
  }

async function getUser() {
  return axios({
    method: "GET",
    url: `${process.env.REACT_APP_API_BASE_URL}/users/check-token`,
    headers: {
      Authorization: ("Bearer " + getTokenFromStorage()) as any,
    },
  });
}
