import firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from 'help/firebaseConfig';

firebase.initializeApp(firebaseConfig);

export default firebase;
