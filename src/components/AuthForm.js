import { authService } from "myBase";
import React, {useState} from "react";

const AuthForm = () => {
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
    return (
    <>
        <form onSubmit={onSubmit} className="container">
            <input name="email" type="text" placeholder="Email" required value={email} onChange={onChange} className="authInput" />            
            <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange} className="authInput" /> 
            <input type="submit" value={newAccount? "Create Account": "Sign In"} className="authInput authSubmit" />      
            {error && <span className="authError">{error}</span>}   
        </form>
        <span onClick={toggleAccount} className="authSwitch">{newAccount? "Sign in":"Create Account"}</span>
    </>
    );


}

export default AuthForm;