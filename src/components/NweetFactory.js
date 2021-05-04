import React, {useState}  from "react";
import { dbService, storageService } from "myBase";
import {v4 as uuidv4} from "uuid";

const NweetFactory = ({userObj}) =>{
    const [nweet, setNweet] = useState("");
    
    const [attachment,setAttachment] = useState("");

    // DB 콜렉션에 제출한 내용을 넣어준다.
    const onSubmit = async (event) => {
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
    const onClearAttachment = () => setAttachment();
    return (
        <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={OnChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Nweet" />
        {attachment && (
          <div> 
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
    )
}

export default NweetFactory;