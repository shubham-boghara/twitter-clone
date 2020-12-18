import React from "react";
import {dbService} from "../firebase";
import {useState} from "react"

const Stweet = ({tweetObj,isOwner}) => {
    const [editing,Setediting] = useState(false);
    const [newtweet,SetNewtweet] = useState(tweetObj.text);

    const onDeletaClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this tweet!");
        if(ok) {
            await dbService.doc(`twitts/${tweetObj.id}`).delete();
        }
    }
    const toggalEditing = () => {
        Setediting((prev) => !prev);
    }
    const Changetweet = (event) => {
        const {target:{value},} = event
        SetNewtweet(value);
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`twitts/${tweetObj.id}`).update({
            text:newtweet
        })
        Setediting(false);
    }

    return (
        <div>
        {
            editing ? <>
                <form onSubmit={onSubmit}>
                    <input type="text"
                      value={newtweet}
                       name="name"
                       onChange={Changetweet}
                        placeholder="Edit your Text"/>
            <input type="Submit" value="Update"/>
            </form>
               <button onClick={toggalEditing}>Cancel</button>
            </> : <>

                    <h4>{tweetObj.text}</h4>
                    {isOwner && (<>
                        <button onClick={onDeletaClick}>Delete Tweet</button>
                        <button onClick={toggalEditing}>Edit Tweet</button></>)}
                      </>
        }
        </div>
    );
}

export default Stweet;