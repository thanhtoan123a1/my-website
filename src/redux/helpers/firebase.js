import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import firebaseConfig from 'help/firebaseConfig';

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const firestore = app.firestore();
export const storage = app.storage();

export const uploadImage = async (path, file, setProgress) => {
  return new Promise((resolve, reject) => {
    const task = storage.ref(path).put(file);
    task.on(
      'state_changed',
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

export const uploadMultipleImage = async (params) => {
  const { path, files } = params;
  return new Promise((resolve, reject) => {
    const promiseList = [];
    for (let file of files) {
      promiseList.push(uploadImage(`${path}/${file.name}`, file, () => {}));
    }
    Promise.all(promiseList).then((urls) => {
      resolve(urls);
    });
  });
};

export const getCoursesComments = (courseId) =>
  new Promise((resolve, reject) => {
    try {
      firestore
        .collection('courses')
        .doc(courseId)
        .collection('comments')
        .orderBy('createdAt')
        .get({
          source: 'server',
        })
        .then((snaps) => {
          const commentList = snaps.docs.length
            ? snaps.docs.map((snap) => {
                const data = snap.data();
                return {
                  ...data,
                  id: snap.id,
                };
              })
            : [];
          resolve(commentList);
        });
    } catch (err) {
      reject(err);
    }
  });

export const getCoursesLikes = (courseId) =>
  new Promise((resolve, reject) => {
    try {
      firestore
        .collection('courses')
        .doc(courseId)
        .get()
        .then((snaps) => {
          const list =
            snaps.data && snaps.data() && snaps.data().likeList
              ? snaps.data().likeList
              : [];
          resolve(list);
        });
    } catch (err) {
      reject(err);
    }
  });

export const addCoursesComment = (params) => {
  const { courseId, body } = params;
  body.user = firestore.collection('users').doc(body.userId);
  new Promise((resolve, reject) => {
    try {
      firestore
        .collection('courses')
        .doc(courseId)
        .collection('comments')
        .add(body)
        .then(() => {
          resolve();
        });
    } catch (err) {
      reject(err);
    }
  });
};

export const addNewMessage = (params) => {
  const { content, createAt, roomId, userId, type, imgURL } = params;
  const body = {
    type,
    content,
    userId,
    createAt,
    imgURL,
  };
  new Promise((resolve, reject) => {
    try {
      firestore
        .collection('messages')
        .doc(roomId)
        .collection('messages')
        .add(body)
        .then(() => {
          resolve();
        });
    } catch (err) {
      reject(err);
    }
  });
};

export const addRoom = (params) => {
  const { lastMessage, createAt, userId, partnerId, callback } = params;
  const body = {
    lastMessageTime: createAt,
    lastMessage,
    user: [userId, partnerId],
  };
  body[`user${userId}`] = true;
  body[`user${partnerId}`] = true;
  new Promise((resolve, reject) => {
    try {
      firestore
        .collection('messages')
        .add(body)
        .then((e) => {
          if (callback) {
            setTimeout(() => {
              callback();
            }, 1000);
          }
          resolve();
        });
    } catch (err) {
      reject(err);
    }
  });
};

export const updateNewMessage = (params) => {
  const { content, createAt, roomId } = params;
  const body = {
    lastMessageTime: createAt,
    lastMessage: content,
  };
  new Promise((resolve, reject) => {
    try {
      firestore
        .collection('messages')
        .doc(roomId)
        .update(body)
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
        .collection('courses')
        .doc(courseId)
        .collection('comments')
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

export const handleLike = (params) => {
  const { courseId, data } = params;
  new Promise((resolve, reject) => {
    try {
      firestore
        .collection('courses')
        .doc(courseId)
        .set({ likeList: data })
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
        .collection('users')
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
        .collection('users')
        .doc(userId)
        .get({
          source: 'server',
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

export const getRealTimeUsers = (callback) => {
  return new Promise(async (resolve, reject) => {
    try {
      firestore
        .collection('users')
        .orderBy('displayName')
        .onSnapshot((querySnapshot) => {
          const users = querySnapshot.docs.map((user) => {
            return {
              ...user.data(),
              id: user.id,
            };
          });
          callback(users);
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
        .collection('courses')
        .doc(courseId)
        .collection('comments')
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

//News-feed

export const getAllPosts = () =>
  new Promise((resolve, reject) => {
    try {
      firestore
        .collection('news-feed')
        .orderBy('createdAt', 'desc')
        .get()
        .then((snaps) => {
          const posts = snaps.docs.length
            ? snaps.docs.map((snap) => {
                const data = snap.data();
                return {
                  ...data,
                  id: snap.id,
                };
              })
            : [];
          resolve(posts);
        });
    } catch (err) {
      reject(err);
    }
  });

export const addNewPost = (params) => {
  const {
    content = '',
    createdAt,
    userId,
    images = [],
    shareURL = '',
    type,
    video = '',
  } = params;
  const body = {
    type,
    createdAt,
    content,
    userId,
    images,
    video,
    shareURL,
  };
  new Promise((resolve, reject) => {
    try {
      firestore
        .collection('news-feed')
        .add(body)
        .then(() => {
          resolve();
        });
    } catch (err) {
      reject(err);
    }
  });
};

export const updatePost = (params) => {
  const { postId, body } = params;
  new Promise((resolve, reject) => {
    try {
      firestore
        .collection('news-feed')
        .doc(postId)
        .update(body)
        .then(() => {
          resolve();
        });
    } catch (err) {
      reject(err);
    }
  });
};

export default app;
