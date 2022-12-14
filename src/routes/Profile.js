import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

const Profile = ({userObj, refreshUser, setInit}) => {
    const navigate = useNavigate();
    const [newDisplayName, SetNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = async () => {
        await authService.signOut();
        const isLogOuted = true;
        setInit(false);
        navigate("/", {
            state: {isLogOuted: isLogOuted}
        });        
    };

    const getMyNweets = async () => {
        const q = query(
            collection(dbService, "nweets"),
            where("creatorId", "==", userObj.uid),
            orderBy("createdAt", "desc")
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
        });
    };

    useEffect(() => {
        getMyNweets();
    }, [userObj]);

    const onChange = (event) => {
        const {
            target: {value},            
        } = event;
        SetNewDisplayName(value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName) {
            await updateProfile(authService.currentUser, {
                displayName: newDisplayName,
            });
            refreshUser();
        }
    };
    return (        
         <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input type="text" placeholder="이름 표시" value={newDisplayName} onChange={onChange} autoFocus className="formInput"/>
                <input type="submit" value="프로파일 갱신" className="formBtn" style={{marginTop: 10,}}/>
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
                Log Out
            </span>
        </div>
    );
};

export default Profile;