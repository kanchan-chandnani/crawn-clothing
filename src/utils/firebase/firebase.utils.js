import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signOut, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'
import { useSearchParams } from 'react-router-dom';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCji3XLpJ7e8MIb4DuxveP3ptfK1AxuLW4",
  authDomain: "crwn-clothing-db-413f7.firebaseapp.com",
  projectId: "crwn-clothing-db-413f7",
  storageBucket: "crwn-clothing-db-413f7.appspot.com",
  messagingSenderId: "909629469472",
  appId: "1:909629469472:web:216ae985a2ab9f904e9d45"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {displayName: 'kinu'}) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef)
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot)
  console.log(userSnapshot.exists())  

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createedAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createedAt,
        ...additionalInformation
      });
    }
    catch (error) {
      console.log('error creating the user', error.message);
    }
  }
  return userDocRef;
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = () => signOut(auth);

export const onAuthStateChangeListener = (callback) => {
  onAuthStateChanged(auth, callback)
}