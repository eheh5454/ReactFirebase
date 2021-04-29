import { authService } from "myBase";
import { useHistory } from "react-router-dom";
import React from "react";

export default () => {
    const history = useHistory();    
    function handleClick() {
        history.push("/");
        console.log("history push");
    }
    const onLogOutClick = () => {
        authService.signOut();      
    }

    return (
    <>
        <button onClick={onLogOutClick}>Log Out</button>
    </>
    );
};