import React, {useEffect, useState} from 'react';
import AppRouter from "components/Router";
import {authService} from "myBase";

function App() {
  const [init, setInit] = useState(false);
  console.log(authService.currentUser);
  // useEffect - componentDid, componentWill 시리즈가 합쳐진 것 
  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{
      if(user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
    }, []);
    // useState: this.state와 동일함, state 변수 선언(안 사라짐)
    // 왼쪽 인자는 변수, 오른쪽은 이 변수를 갱신할 함수를 의미 
    // setIsLoggedIn(false) 이런식으로 갱신함.
    const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
    // footer를 쓰면 라우트 이외에 추가로 더 넣을 수 있음
    return (
      <>
      {init? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing...."}
      <footer>&copy; {new Date().getFullYear()}Nwitter</footer>
      </>
    );
}

export default App;
