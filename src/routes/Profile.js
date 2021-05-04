import { authService } from "myBase";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";

export default ({refreshUser, userObj}) => {
    const history = useHistory();    
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);  
    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewDisplayName(value);
    }
    const onLogOutClick = () => {
        authService.signOut();      
        history.push("/");        
    }
    const onSubmit = async (event) => {
        event.preventDefault();        
        if (userObj.displayName !== newDisplayName)
        { 
            await userObj.updateProfile({displayName: newDisplayName,});
            console.log("Update");
        }
        refreshUser();
    };

    return (
    <>
    <form onSubmit={onSubmit}>
        <input onChange={onChange} type="text" placeholder="Display name" value={newDisplayName} />
        <input type="submit" value="Update Profile" />
    </form>
        <button onClick={onLogOutClick}>Log Out</button>
    </>
    );
};