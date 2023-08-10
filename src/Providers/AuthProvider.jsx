import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import app from "../firebase/firebase.config";


export const AuthContext=createContext(null);
const auth=getAuth(app);

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password); //its firebase function
    };

     const signIn = (email, password) => {
      setLoading(true);
       return signInWithEmailAndPassword(auth, email, password); //its firebase function
     };

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, currentUser => {
        setUser(currentUser);
        setLoading(false);
      });
      /* stop observing while unmounting */
      return () => {
        return unsubscribe();
      };
    }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn
  };
  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;