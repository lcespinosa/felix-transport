import {createContext, useContext, useEffect, useState} from 'react';
import {onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import {auth} from '../lib/firebaseConfig';
import CONSTANTS from '../utils/constants';

const {USERS} = CONSTANTS;

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({children}) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const data = USERS.find(u => u.email === user.email);
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          role: data?.role,
          route: data?.route,
        });
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const logout = async () => {
    setUser(null);
    await signOut(auth);
  }

  return (
    <AuthContext.Provider value={{user, login, logout}}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
}
