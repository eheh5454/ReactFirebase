import React, {useState}  from "react";
import { dbService, storageService } from "myBase";
import {v4 as uuidv4} from "uuid";

const NweetFactory = ({userObj}) =>{
    const [nweet, setNweet] = useState("");
    
    const [attachment,setAttachment] = useState("");

    // DB 콜렉션에 제출한 내용을 넣어준다.
    const onSubmit = async (event) => {
        if (nweet === "") {
          return;
        }
        event.preventDefault();
        let attachmentUrl ="";
        if(attachment !== ""){
          const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
          const response = await fileRef.putString(attachment, "data_url");
          attachmentUrl = await response.ref.getDownloadURL();
        }
        
        const nweetObj = { 
          text: nweet,
          createdAt: Date.now(),
          creatorId: userObj.uid,
          attachmentUrl,
        }
        await dbService.collection("nweets").add(nweetObj);       
        setNweet("");
        setAttachment("");
    };
    const OnChange = (event) => {
        const {target:{value}} = event; 
        setNweet(value);
    };
    const onFileChange = (event) => {
      const {target:{files}} = event;
      const theFile = files[0];      
      const reader = new FileReader()
      reader.onloadend = (finishedEvent) => {
        console.log(finishedEvent);
        const {currentTarget: {result}} = finishedEvent;
        setAttachment(result);
      }
      reader.readAsDataURL(theFile);      
    }
    const onClearAttachment = () => setAttachment("");
    return (
        <form onSubmit={onSubmit} className="factoryForm">
         <div className="factoryInput__container">
          <input
            className="factoryInput__input"
            value={nweet}
            onChange={OnChange}
            type="text"
            placeholder="What's on your mind?"
            maxLength={120}
          />
          <input type="submit" value="&rarr;" className="factoryInput__arrow" />
        </div>
        <label for="attach-file" className="factoryInput__label">
          <span>Add photos</span>          
        </label>        
        <input id="attach-file" type="file" accept="image/*" onChange={onFileChange} style={{opacity: 0,}} />
        {attachment && (
          <div className="factoryForm__attachment">  
            <img src={attachment}  style={{
              backgroundImage: attachment,
            }} />
            <div className="factoryForm__clear" onClick={onClearAttachment}>
            <span>Remove</span>
            </div>
          </div>
        )}
      </form>
    )
}

export default NweetFactory;