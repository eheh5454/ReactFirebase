import AuthForm from "components/AuthForm";
import { authService, firebaseInstance } from "myBase";
import React, {useState} from "react";

const Auth = () => {   

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
        <AuthForm />
        <div>
            <button name="google" onClick={onSocialClick}>Continue with Google</button>
            <button name="gitHub" onClick={onSocialClick}>Continue with Github</button>
            <button>Continue with Email</button>
        </div>
    </div>

    )
}

export default Auth;
