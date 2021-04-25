import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import firebaseConfig from 'help/firebaseConfig';

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export default app;
