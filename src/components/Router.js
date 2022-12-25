import React from "react";
import {HashRouter, Routes, Route, useLocation} from "react-router-dom";
import Home from "../routes/Home"
import Auth from "../routes/Auth"
import Navigation from "./Navigation";
import Profile from "routes/Profile";

const AppRouter = ({ setInit, refreshUser, isLoggedIn, userObj }) => {        
    return (
        <HashRouter>
            {isLoggedIn && <Navigation userObj={userObj}/>}
            <Routes>
                {isLoggedIn ? (
                    <>
                    <Route path="/" element={<Home userObj={userObj} />} />
                    <Route path="/profile" element={<Profile userObj={userObj} refreshUser={refreshUser} setInit={setInit} />} />
                    </> 
                    ) 
                    :
                    (
                        <Route path="/" element={<Auth />} />
                    )
                } 
            </Routes>
        </HashRouter>
    );
}

export default AppRouter;
