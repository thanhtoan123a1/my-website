import axios from 'axios';

export const apiEndpoint = {
  login: () => `/login`,
};

const baseURL = process.env.NODE_ENV === 'production' ? "https://toantvt.herokuapp.com" : "http://localhost:3000/";

const createApiInstance = () =>
  axios.create({
    baseURL,
    timeout: 60000,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

export const getApiRequest = (path, params) => {
  const api = createApiInstance();
  return new Promise((resolve, reject) => {
    api
      .get(path, { params })
      .then(res => {
        resolve({ ...res });
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const postApiRequest = (path, body) => {
  const api = createApiInstance();
  return new Promise((resolve, reject) => {
    api
      .post(path, body)
      .then(res => {
        resolve({ status: res.status, data: res.data });
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const putApiRequest = (path, body) => {
  const api = createApiInstance();
  return new Promise((resolve, reject) => {
    api
      .put(path, body)
      .then(res => {
        resolve({ status: res.status, data: res.data });
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const deleteApiRequest = (path) => {
  const api = createApiInstance();
  return new Promise((resolve, reject) => {
    api
      .delete(path)
      .then(res => {
        resolve({ status: res.status, data: res.data });
      })
      .catch(error => {
        reject(error);
      });
  });
};
