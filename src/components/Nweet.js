import { async } from "@firebase/util";
import { dbService, storageService } from "fbase";
import { doc, deleteDoc, updateDoc }from"firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React, { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("정말 지울거니?");
        if(ok) {
            const NweetTextRef =doc(dbService, "nweets", `${nweetObj.id}`);
            if(nweetObj.attachmentUrl != "")
                await deleteObject(ref(storageService, nweetObj.attachmentUrl));
            await deleteDoc(NweetTextRef );
        }
    };
    const toggleEditing = () => setEditing(prev => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        const NweetTextRef =doc(dbService, "nweets", `${nweetObj.id}`);
        await updateDoc(NweetTextRef, {text: newNweet} );
        setEditing(false);
    }
    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewNweet(value);
    };
    return (
        <div>
            {
                editing ? 
                <>
                <form onSubmit={onSubmit}>
                    <input type="text" placeholder="수정해요" value={newNweet} required onChange={onChange} /> 
                    <input type="submit" value="수정" />
                </form> 
                <button onClick={toggleEditing}>cancel</button>
                </>
                :(<>
                <h4>{nweetObj.text}</h4>
                {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} width="50px" width="50px" />}
                {isOwner && (
                    <>
                        <button onClick={onDeleteClick}>제거</button>
                        <button onClick={toggleEditing}>수정</button>
                    </>
                )}
                </>                
            )}
        </div>
    );
};

export default Nweet;