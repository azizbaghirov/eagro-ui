import axios from "axios";
import { getTokenFromStorage } from "utils/helpers";

export const fileService = {
  getFiles,
  getFilesDates,
  getFilesByDate,
  getFileGroups,
  createPDFReport,
  editPDFReport,
  deletePDFReport,
  getPDFReport,
  getPDFReportList,
  editStatusPDFReport,
};

function getFiles(id: string) {
  return axios({
    method: "GET",
    url: `${process.env.REACT_APP_API_BASE_URL}/files/${id}`,
    headers: {
      Authorization: ("Bearer " + getTokenFromStorage()) as any,
    },
  });
}

function getFilesDates(id: string) {
  return axios({
    method: "GET",
    url: `${process.env.REACT_APP_API_BASE_URL}/files/${id}/dates`,
    headers: {
      Authorization: ("Bearer " + getTokenFromStorage()) as any,
    },
  });
}

function getFilesByDate(id: string, date: string) {
  return axios({
    method: "GET",
    url: `${process.env.REACT_APP_API_BASE_URL}/files/${id}/date/${date}`,
    headers: {
      Authorization: ("Bearer " + getTokenFromStorage()) as any,
    },
  });
}

function getFileGroups() {
  return axios({
    method: "GET",
    url: `${process.env.REACT_APP_API_BASE_URL}/files/groups/short`,
    headers: {
      Authorization: ("Bearer " + getTokenFromStorage()) as any,
    },
  });
}

function createPDFReport(pdfReport: any) {
  var bodyFormData = new FormData();
  Object.keys(pdfReport).forEach((key) => {
    bodyFormData.append(key, pdfReport[key]);
  });

  return axios({
    method: "POST",
    url: `${process.env.REACT_APP_API_BASE_URL}/files/file`,
    data: bodyFormData,
    headers: {
      Authorization: ("Bearer " + getTokenFromStorage()) as any,
      "Content-Type": "multipart/form-data",
    },
  });
}

function editPDFReport(pdfReport: any, id: number) {
  var bodyFormData = new FormData();
  Object.keys(pdfReport).forEach((key) => {
    bodyFormData.append(key, pdfReport[key]);
  });

  return axios({
    method: "PUT",
    url: `${process.env.REACT_APP_API_BASE_URL}/files/${id}/file`,
    data: bodyFormData,
    headers: {
      Authorization: ("Bearer " + getTokenFromStorage()) as any,
      "Content-Type": "multipart/form-data",
    },
  });
}

function deletePDFReport(id: number) {
  return axios({
    method: "DELETE",
    url: `${process.env.REACT_APP_API_BASE_URL}/files/${id}/file`,
    headers: {
      Authorization: ("Bearer " + getTokenFromStorage()) as any,
    },
  });
}

function getPDFReport(id: number) {
  return axios({
    method: "GET",
    url: `${process.env.REACT_APP_API_BASE_URL}/files/${id}/file`,
    headers: {
      Authorization: ("Bearer " + getTokenFromStorage()) as any,
    },
  });
}

function getPDFReportList(payload: any) {
  let params = new URLSearchParams();
  Object.keys(payload).forEach((key) => {
    if (Array.isArray(payload[key])) {
      payload[key].forEach((p: any) => {
        params.append(key, p);
      });
    } else {
      params.append(key, payload[key]);
    }
  });

  return axios({
    method: "GET",
    url: `${process.env.REACT_APP_API_BASE_URL}/files`,
    headers: {
      Authorization: ("Bearer " + getTokenFromStorage()) as any,
    },
    params,
  });
}

function editStatusPDFReport(status: boolean, id: number) {
  return axios({
    method: "PATCH",
    url: `${process.env.REACT_APP_API_BASE_URL}/files/${id}/file/${status}`,
    headers: {
      Authorization: ("Bearer " + getTokenFromStorage()) as any,
      "Content-Type": "multipart/form-data",
    },
  });
}
