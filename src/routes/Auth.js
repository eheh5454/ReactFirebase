import { authService, firebaseInstance } from "myBase";
import React, {useState} from "react";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    // 발생한 이벤트에서 name, value를 가져온다.
    // 그 후, 그 값을 이용해 무언가 처리를 함(이메일, 패스워드 설정)
    const onChange = (event) => {
        const {target: {name,value}}=event;
        console.log(value);
        if(name === "email"){
            setEmail(value)
        } else if(name==="password") {
            setPassword(value)
        }           
      
    };
    const onSubmit = async(event) => {
        event.preventDefault();
        try {
            let data;
            if(newAccount){
                // create account 
                const data = await authService.createUserWithEmailAndPassword(email, password);
            } else {
                // log in
                const data = await authService.signInWithEmailAndPassword(email,password);
            }
            console.log(data);
        } catch(error) {
            setError(error.message);
        }        
        
    };
    // 로그인 <-> 회원가입 전환 
    const toggleAccount = () => setNewAccount((prev)=>!prev);
    // 소셜 로그인 기능 
    const onSocialClick = async (event) => {
        const {
            target: {name}, 
        } = event;
        let provider;
        // name으로 구분하여 구글, 깃허브 로그인 진행 
        if(name === "google"){
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === "gitHub") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        // 팝업 방식으로 로그인
        const data = await authService.signInWithPopup(provider);
        console.log(data);
    }
    return (
    <div>        
        <form onSubmit={onSubmit}>
            <input name="email" type="text" placeholder="Email" required value={email} onChange={onChange} />            
            <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange} /> 
            <input type="submit" value={newAccount? "Create Account": "Sign In"} />      
            {error}   
        </form>
        <span onClick={toggleAccount}>{newAccount? "Sign in":"Create Account"}</span>
        <div>
            <button name="google" onClick={onSocialClick}>Continue with Google</button>
            <button name="gitHub" onClick={onSocialClick}>Continue with Github</button>
            <button>Continue with Email</button>
        </div>
    </div>

    )
}

export default Auth;
