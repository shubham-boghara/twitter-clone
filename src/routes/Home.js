import React from "react";
import {useState,useEffect} from 'react';
import {dbService} from "../firebase";
import Stweet from "../components/Tweet";



const Home = ({userObj}) => {

    const [twitt,settwitt] = useState("");
    const [twitts,settwitts] = useState([]);
    /*const gettwitts = async() => {
        const dbtwitts = await dbService.collection("twitts").get()
        dbtwitts.forEach(document => {
            const twittObject = {
                ...document.data(),
                id: document.id,

            }
            settwitts(prev => [twittObject,...prev])
        });
    }*/
    useEffect(() => {
     /* gettwitts();*/
      dbService.collection("twitts").onSnapshot((s) => {
         const tArry = s.docs.map((doc) =>
             ({
                 id: doc.id,
                 ...doc.data(),
             }))
          settwitts(tArry);
      })
    },[])

    const onsubmit = async (event) => {
        event.preventDefault();
       await dbService.collection("twitts").add({
            text:twitt,
            createdAt:Date.now(),
           creatorId: userObj.uid,
        });
        settwitt("");
    }

    const onChange = (event) => {
        const {target :{value}} = event;
        settwitt(value);
    };

    return (
    <div>
        <form onSubmit={onsubmit}>
            <input type="text"
                   value={twitt}
                   onChange={onChange}
                   placeholder="What's on your mind?"
                   maxLength="120"/>
            <input type="submit" value="twitter"/>
        </form>
        <div>
            {twitts.map(t => (
                <Stweet key={t.id} tweetObj={t} isOwner={t.creatorId === userObj.uid}/>
            ))}
        </div>
    </div>
    )
}

export default Home;