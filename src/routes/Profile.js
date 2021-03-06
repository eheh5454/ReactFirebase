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
 
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input onChange={onChange} type="text" autoFocus placeholder="Display name" value={newDisplayName} className="formInput" />
        <input type="submit" value="Update Profile" className="formBtn" style={{ marginTop: 10, }} />    
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
    );
};