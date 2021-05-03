import React, {useEffect, useState} from 'react';
import AppRouter from "components/Router";
import {authService} from "myBase";

function App() {
  const [init, setInit] = useState(false);
  // 유저 담는 변수 
  const [userObject,setUserObject] = useState(null);
  // useEffect - componentDid, componentWill 시리즈가 합쳐진 것 
  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{
        if(user) {
          setUserObject({
            displayName: user.displayName,
            uid: user.uid,
            updateProfile: (args) => user.updateProfile(args),
          });             
        } 
      setInit(true);
    });
    }, []);
    const refreshUser = () => {
      const user = authService.currentUser;      
      setUserObject(Object.assign({},user));     
    };
    // footer를 쓰면 라우트 이외에 추가로 더 넣을 수 있음
    // user Login을 Boolean함수로 체크함 
    return (
      <>
      {init? <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObject)} userObj={userObject} /> : "Initializing...."}
      </>
    );
}

export default App;
