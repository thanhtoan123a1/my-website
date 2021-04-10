import axios from 'axios';

export const apiEndpoint = {
  login: () => `/login`,
};

const createApiInstance = () =>
  axios.create({
    baseURL: "https://toantvt.herokuapp.com",
    timeout: 60000,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

export const getApiRequest = (path, params) => {
  const api = createApiInstance();
  return new Promise(resolve => {
    api
      .get(path, { params })
      .then(res => {
        resolve({ ...res });
      })
      .catch(error => {
        console.log("error", error);
      });
  });
};

export const postApiRequest = (path, body) => {
  const api = createApiInstance();
  return new Promise(resolve => {
    api
      .post(path, body)
      .then(res => {
        resolve({ status: res.status, data: res.data });
      })
      .catch(error => {
        console.log("error", error);
      });
  });
};

export const putApiRequest = (path, body) => {
  const api = createApiInstance();
  return new Promise(resolve => {
    api
      .put(path, body)
      .then(res => {
        resolve({ status: res.status, data: res.data });
      })
      .catch(error => {
        console.log("error", error);
      });
  });
};

export const deleteApiRequest = (path) => {
  const api = createApiInstance();
  return new Promise(resolve => {
    api
      .delete(path)
      .then(res => {
        resolve({ status: res.status, data: res.data });
      })
      .catch(error => {
        console.log("error", error);
      });
  });
};
