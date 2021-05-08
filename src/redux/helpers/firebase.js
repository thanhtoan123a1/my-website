import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import firebaseConfig from "help/firebaseConfig";

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const firestore = app.firestore();
export const storage = app.storage();

export const uploadImage = async (path, file, setProgress) => {
  return new Promise((resolve, reject) => {
    const task = storage.ref(path).put(file);
    task.on(
      "state_changed",
      // watch progress of upload file
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        if (setProgress) setProgress(progress);
      },
      (error) => {
        reject(error);
      },
      () => {
        task.snapshot.ref.getDownloadURL().then((url) => resolve(url));
      }
    );
  });
};

export const getCoursesComments = (courseId) =>
  new Promise((resolve, reject) => {
    try {
      firestore
        .collection("courses")
        .doc(courseId)
        .collection("comments")
        .orderBy("createdAt")
        .get({
          source: "server",
        })
        .then((snaps) => {
          const commentList = [];
          const promiseData = [];
          snaps.docs.forEach(async (snap) => {
            const data = snap.data();
            commentList.push({
              ...data,
              id: snap.id,
            });
            promiseData.push(data.user.get());
          });
          Promise.all(promiseData).then((snapshots) => {
            for (let i = 0; i < snapshots.length; i++) {
              const itemData = snapshots[i].data();
              commentList[i].avatar = itemData.photoURL;
              commentList[i].userName = itemData.displayName;
            }
            resolve(commentList);
          });
        });
    } catch (err) {
      reject(err);
    }
  });

export const addCoursesComment = (params) => {
  const { courseId, body } = params;
  body.user = firestore.collection("users").doc(body.userId);
  new Promise((resolve, reject) => {
    try {
      firestore
        .collection("courses")
        .doc(courseId)
        .collection("comments")
        .add(body)
        .then(() => {
          resolve();
        });
    } catch (err) {
      reject(err);
    }
  });
};

export const loveClicks = (params) => {
  const { commentId, data, courseId } = params;
  new Promise((resolve, reject) => {
    try {
      firestore
        .collection("courses")
        .doc(courseId)
        .collection("comments")
        .doc(commentId)
        .update({ loveList: data })
        .then(() => {
          resolve();
        });
    } catch (err) {
      reject(err);
    }
  });
};

export const updateUserDetail = (params) => {
  const { userId, data } = params;
  new Promise((resolve, reject) => {
    try {
      firestore
        .collection("users")
        .doc(userId)
        .update(data)
        .then(() => {
          resolve();
        });
    } catch (err) {
      reject(err);
    }
  });
};

export const getUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      await firestore
        .collection("users")
        .doc(userId)
        .get({
          source: "server",
        })
        .then((snap) => {
          const response = snap.data();
          resolve(response);
        });
    } catch (err) {
      reject(err);
    }
  });
};

export const deleteAComment = (params) => {
  const { commentId, courseId } = params;
  new Promise((resolve, reject) => {
    try {
      firestore
        .collection("courses")
        .doc(courseId)
        .collection("comments")
        .doc(commentId)
        .delete()
        .then(() => {
          resolve();
        });
    } catch (err) {
      reject(err);
    }
  });
};

export default app;
