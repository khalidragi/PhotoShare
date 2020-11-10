import React, { createContext, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import firebase, { auth } from '../config/firebase';
import LinearProgress from '@material-ui/core/LinearProgress';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  let history = useHistory();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        history.push('/');
      } else {
        history.push('/login');
      }
    });

    return unsubscribe;
  }, [history]);

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  const signInWithEmail = (email, password) => {
    auth.signInWithEmailAndPassword(email, password).catch((err) => {
      setError(err.message);
    });
  };

  const signUp = (email, password, displayName) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((cur) =>
        cur.user.updateProfile({
          displayName,
        })
      )
      .catch((err) => setError(err.message));
  };

  const signOut = () => auth.signOut();

  if (loading)
    return (
      <div style={{ width: '100%' }}>
        <LinearProgress />
      </div>
    );

  return (
    <AuthContext.Provider
      value={{
        user,
        signOut,
        signInWithGoogle,
        signInWithEmail,
        error,
        signUp,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
