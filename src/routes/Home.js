import { dbService } from "myBase";
import React, {useState, useEffect} from "react";
import Nweet from "components/Nweet";

const Home = ({userObj}) => {
  console.log(userObj);
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    
    useEffect( () => {     
      console.log("use Effect");
      // onSanpshot: nweets 콜렉션에 무슨 일이 생길때마다 업데이트 되는 콜백 함수(리얼타임)
      // db에서 정보를 가져와 nweets에 저장한다.
      // ...을 쓰면 prev의 모든 데이터를 document.data()로 대체하겠다는 뜻 
      dbService.collection("nweets").onSnapshot((snapshot) => {
        const nweetArray = snapshot.docs.map(doc => ({id:doc.id, ...doc.data(),}));      
        setNweets(nweetArray);
      });
    }, []);
    // DB 콜렉션에 제출한 내용을 넣어준다.
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("nweets").add({
            text: nweet,
            createdAt:Date.now(),
            creatorId: userObj.uid,
        });
        setNweet("");
    };
    const OnChange = (event) => {
        const {target:{value}} = event; 
        setNweet(value);
    };
    return (
        <div>
          <form onSubmit={onSubmit}>
            <input
              value={nweet}
              onChange={OnChange}
              type="text"
              placeholder="What's on your mind?"
              maxLength={120}
            />
            <input type="submit" value="Nweet" />
          </form>
          <div>
            {nweets.map((nweet) => (
              <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
            ))}
          </div>
        </div>
      );
};

export default Home;