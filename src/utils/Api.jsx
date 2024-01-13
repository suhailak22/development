import axios from "axios";
import { APP_BASE_URL } from "./Contants";

const base_url = APP_BASE_URL;
// const base_url = "https://backend.albionpropertyhub.com/api/";
const header = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
export const api = {
  getMethod: (url, data) => {
    let URL = base_url + url;
    return new Promise((resolve, reject) => {
      axios
        .get(URL, data, { header: header })
        .then((res) => {
          if (res.status === 200) {
            resolve(res.data);
          }
        })
        .catch((err) => reject(err));
    });
  },
  postMethod: (url, data) => {
    let URL = base_url + url;
    return new Promise((resolve, reject) => {
      axios
        .post(URL, data, { header: header })
        .then((res) => {
          if (res.status === 200) {
            resolve(res.data);
          }
        })
        .catch((err) => reject(err));
    });
  },
  postFormMethod: (url, data) => {
    let URL = base_url + url;
    const formData = new FormData();
    Object.keys(data).map((obj) => {
      formData.append(obj, data[obj]);
    });
    return new Promise((resolve, reject) => {
      axios
        .post(URL, formData, { header: header })
        .then((res) => {
          if (res.status === 200) {
            resolve(res.data);
          }
        })
        .catch((err) => reject(err));
    });
  },
};
