import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from  "fbase";
import { updateProfile } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => updateProfile(user, { displayName: user.displayName }),
        });
      } 
      setInit(true);
    });
  }, [])
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => updateProfile(user, { displayName: user.displayName }),
    });
  };

  const Init = () => {
    setUserObj(null);    
  };

  return (
  <> 
    {init ? <AppRouter setInit={Init} refreshUser={refreshUser} isLoggedIn={(Boolean(userObj))} userObj={userObj} /> : "초기화중..."}
    <footer>&copy; NWitter {new Date().getFullYear()}</footer> 
  </>);
}

export default App;
