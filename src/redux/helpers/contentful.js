import { client } from "help/client";

export const getEntries = (params) => {
  return new Promise((resolve, reject) => {
    client.getEntries(params)
      .then(data => {
        resolve(data);
      }).catch(error => {
        reject(error);
      });
  })
}

export const getEntry = (entryId) => {
  return new Promise((resolve, reject) => {
    client.getEntry(entryId)
      .then(data => {
        resolve(data);
      }).catch(error => {
        reject(error);
      });
  })
}
