import axios from "axios";
import { getTokenFromStorage } from "utils/helpers";

export const reportService = {
  getReportList,
  getReportUrl,
  authTableau,
  getLabelsByNames,
};

function getReportList() {
  return axios({
    method: "GET",
    url: `${process.env.REACT_APP_API_BASE_URL}/reports`,
    headers: {
      Authorization: ("Bearer " + getTokenFromStorage()) as any,
    },
  });
}

function getReportUrl(reportId: number) {
  return axios({
    method: "GET",
    url: `${process.env.REACT_APP_API_BASE_URL}/reports/${reportId}/tableau`,
    headers: {
      Authorization: ("Bearer " + getTokenFromStorage()) as any,
    },
  });
}

function getLabelsByNames(names: string[]) {
  var params = new URLSearchParams();
  names.map((name: string) => params.append("names", name));

  return axios({
    method: "GET",
    url: `${process.env.REACT_APP_API_BASE_URL}/reports/labels`,
    params: params,
    headers: {
      Authorization: ("Bearer " + getTokenFromStorage()) as any,
    },
  });
}

async function authTableau() {
  return axios({
    method: "POST",
    url: `${process.env.REACT_APP_TABLEAU_URL}/trusted`,
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
    },
    data: {
      username: "digirella",
    },
  });
}
