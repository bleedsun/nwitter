import React, { useEffect, useState } from "react";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { v4 } from 'uuid';
import { dbService, storageService } from "fbase";
import { addDoc, collection, query, getDocs, onSnapshot } from "firebase/firestore";

const NweetFactory = ( { userObj }) => {
    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] = useState("");
    const onSubmit = async (event) => {
        event.preventDefault();
        try{
            /*const docRef = await addDoc(collection(dbService, "nweets"), {
                text: nweet,
                createdAt: Date.now(),
                creatorId: userObj.uid, 
            });
            console.log("Doc Id: ", docRef.id);*/
            let attachmentUrl = "";
            if(attachment !== "")
            {
                const attachmentRef = ref(storageService, `${userObj.uid}/${v4()}`);
                const response = await uploadString(attachmentRef, attachment, "data_url");
                attachmentUrl = await getDownloadURL(response.ref);
            }
            const nweetObj = {
                text: nweet,
                createdAt: Date.now(),
                creatorId: userObj.uid,
                attachmentUrl
            }
            await addDoc(collection(dbService, "nweets"), nweetObj);
        } catch(error) {
            console.error("Error :", error);
        }
        setNweet("");
        setAttachment("");
    }

    const onChange = (event) => {
        const {
            target: {value}
        } = event;
        setNweet(value);
    }
    const onFileChange = (event) => {
        const {target: {files},
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: { result },                
            } = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    }
    const OnClearAttachment = () => setAttachment(null);

    return (
    <form onSubmit={onSubmit}>
        <input value={nweet} onChange={onChange} type="text" placeholder="할 말이 뭐야?" maxLength={120} />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Nweet" />
        {attachment && (
        <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={OnClearAttachment}>clear</button>
        </div>
        )}
    </form>
    );
};

export default NweetFactory;