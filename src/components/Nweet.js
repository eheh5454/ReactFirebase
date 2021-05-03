import { dbService, storageService } from "myBase";
import React, { useEffect, useState } from "react";

// 오너일 경우에만 표시 
const Nweet = ({nweetObj, isOwner}) => {     
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    // 삭제할건지 여부를 묻는 윈도우를 띄운 후에 삭제 
    const onDeleteClick = async() => {
        const ok = window.confirm("Are you sure you to delete this nweet?");
        console.log(ok);
        if (ok) {
            // delete nweet 
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
            await storageService.refFromURL(nweetObj.attachmentUrl).delete();
        }
    }
    // 편집 상태 변경 
    const toggleEditing = () => setEditing((prev)=>!prev);    
    // 제출, 디비에 편집이 끝난 nweet를 제출함 
    const onSubmit = async (event) => {
        event.preventDefault();
        console.log(nweetObj, newNweet);
        await dbService.doc(`nweets/${nweetObj.id}`).update({text: newNweet,});
        setEditing(false);
    }
    // 인풋의 입력에 따라 현재 nweet를 갱신함 
    const onChange = (event) => {
        const {target:{value},
        } = event;
        setNewNweet(value);
    }

    // editing 상태에 따라 편집 화면 <-> 편집, 삭제 선택 전환 
    return (
        <div>
            {
                editing ? (
                // 편집 상태 
                <>
                    {isOwner && (
                        <>
                        <form onSubmit={onSubmit}>
                        <input type="text" placeholder="Edit your Nweet" value={newNweet} required onChange={onChange} />
                        <input type="submit" value="Update Nweet" />
                        </form>
                        <button onClick = {toggleEditing}>Cancel</button>
                        </>
                    )}
                    
                </>
                ) : (
                // 삭제, 편집 선택 
                <>
                    <h4>{nweetObj.text}</h4>   
                    {nweetObj.attachmentUrl && (<img src={nweetObj.attachmentUrl} width="50px" height="50px" />)}
                    {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>Delete Nweet</button>
                            <button onClick={toggleEditing}>Edit Nweet</button>
                        </> 
                    )}
                </>
                )
            }
            
            
        </div>
    );    
};

export default Nweet;