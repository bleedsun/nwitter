import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory"
import { dbService, storageService } from "fbase";
import { addDoc, collection, query, getDocs, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {    
    const [nweets, setNweets] = useState([]);    
    /*const getNweets = async() => {
        const q = query(collection(dbService, "nweets"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const nweetObj = {
            ...doc.data(),
            id: doc.id,            
            }
            //console.log(doc.data());
            setNweets(prev => [nweetObj, ...prev]);
        });
    }*/
    useEffect(() => {        
        const q = query(collection(dbService, "nweets"));
        onSnapshot(q, (snapshot) => {            
            const nweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            setNweets(nweetArray);
        });
    }, []);
    
    return (
    <div className="container">
        <NweetFactory userObj={userObj} />
        <div style={{ marginTop: 30 }}>
            {nweets.map((nweet) => (
                <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
            ))}
        </div>
    </div>
    );
};

export default Home;