import { async } from "@firebase/util";
import { dbService, storageService } from "fbase";
import { doc, deleteDoc, updateDoc }from"firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
        <div className="nweet">
            {
                editing ? 
                <>
                <form onSubmit={onSubmit} className="container nweetEdit">
                    <input
                    onChange={onChange}
                    value={newNweet}
                    required
                    placeholder="Edit your nweet"
                    autoFocus
                    className="formInput"
                    />
                    <input type="submit" value="Update Nweet" className="formBtn" />
                </form> 
                <button onClick={toggleEditing} className="formBtn cancelBtn">
                    Cancel
                </button>
                </>
                :(<>
                <h4>{nweetObj.text}</h4>
                {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} width="50px" width="50px" />}
                {isOwner && (
                    <div className="nweet__actions">
                    <span onClick={onDeleteClick}>
                      <FontAwesomeIcon icon={faTrash} />
                    </span>
                    <span onClick={toggleEditing}>
                      <FontAwesomeIcon icon={faPencilAlt} />
                    </span>
                  </div>
                )}
                </>                
            )}
        </div>
    );
};

export default Nweet;