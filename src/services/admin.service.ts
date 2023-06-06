import axios from "axios";
import { getTokenFromStorage } from "utils/helpers";

export const adminService = {
  getNavList
};

async function getNavList() {
  return axios({
    method: "GET",
    url: `${process.env.REACT_APP_API_BASE_URL}/admin/panel`,
    headers: {
      Authorization: ("Bearer " + getTokenFromStorage()) as any,
    },
  });
}
