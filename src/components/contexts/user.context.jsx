import { signOut } from "firebase/auth";
import { createContext, useState , useEffect} from "react";
import { auth, onAuthStateChangeListener, signOutUser } from "../../utils/firebase/firebase.utils";
import { createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

// as the actual values u want to access
export const UserContext = createContext({
currentUser: null,
setCurrentUser: () => null,
})

export const UserProvider = ({ children }) => {
 const [currentUser, setCurrentUser] = useState(null);
 const value = { currentUser, setCurrentUser};
 signOutUser();
 
 useEffect(() => {
   const unsubscribe = onAuthStateChangeListener((user) => {
    console.log(user);
    if(user){
      createUserDocumentFromAuth(user);
    }
    setCurrentUser(user);
   })
 }, [])
 return <UserContext.Provider value={value}>
  {children}  
 </UserContext.Provider>
}

